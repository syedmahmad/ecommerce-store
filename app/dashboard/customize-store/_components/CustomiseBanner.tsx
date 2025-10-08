"use client";
import { POST, GET, DELETE } from "@/app/utils/Axios";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/app/utils/ImageUploader";
import { TrashIcon } from "@heroicons/react/24/outline";

/**
 * CustomiseBanner component allows users to update store banner title, description,
 * image, and button text. Use this in the dashboard customization flow.
 */
export const CustomiseBanner = () => {
  const [user, setUser] = useState<string | null | any>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData && JSON.parse(lcData);
      if (user?.id) {
        setUser(user);
      }
    }
  }, []);

  const getBannerInfoData = useQuery({
    queryKey: ["banner-info"],
    queryFn: async () => {
      const endpoint = `customise-store-banner/admin?id=${user?.id}`;
      return await GET(endpoint);
    },
    enabled: !!user?.uuid,
  });

  const saveBannerData = getBannerInfoData?.data?.data;

  const [bannerData, setBannerData] = useState({
    storeBannerTitle: "Welcome to Store",
    storeBannerDescription:
      "Discover our curated collection of premium products designed for your lifestyle.",
    imageUrl: saveBannerData?.imageUrl ?? null,
    storeBannerButtonText: "Shop Now",
    uuid: "",
  });

  useEffect(() => {
    if (saveBannerData) {
      setBannerData({
        storeBannerTitle: saveBannerData?.title,
        storeBannerDescription: saveBannerData?.description,
        imageUrl: saveBannerData?.imageUrl,
        storeBannerButtonText: saveBannerData?.buttonText,
        uuid: saveBannerData?.customise_banner_uuid,
      });
    }
  }, [saveBannerData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "storeBannerDescription") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 30) {
        toast.warn("Description must not exceed 100 words");
        return;
      }
    }

    setBannerData((prev) => ({ ...prev, [name]: value }));
  };

  const MAX_SIZE_MB = 5;
  const REQUIRED_WIDTH = 1500;
  const REQUIRED_HEIGHT = 1024;

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size
    if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
      toast.error("Image must be smaller than 5MB");
      return;
    }

    // Validate dimensions
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    console.time("imageLoad");

    image.onload = async () => {
      const { width, height } = image;

      URL.revokeObjectURL(objectUrl);

      try {
        setIsUploading(true);
        // Compress image;
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // try to reduce to 1MB
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });

        // Upload to Firebase

        const path = `banners/banner-${Date.now()}.${compressedFile.name
          .split(".")
          .pop()}`;
        const downloadURL = await uploadImageToFirebase(compressedFile, path);

        setBannerData((prev: any) => ({
          ...prev,
          imageUrl: downloadURL,
        }));

        toast.success("Image uploaded successfully");
        setIsUploading(false);
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Failed to upload image.");
        setIsUploading(false);
      }
    };

    image.onerror = () => {
      toast.error("Invalid image file.");
      URL.revokeObjectURL(objectUrl);
    };

    image.src = objectUrl;
  };

  const [isSavingData, setIsSavingData] = useState(false);

  const handleSave = async () => {
    const lcData = localStorage.getItem("user");
    const parseLCData = lcData && JSON.parse(lcData);
    setIsSavingData(true);
    try {
      const payload = {
        storeBannerTitle: bannerData.storeBannerTitle,
        storeBannerDescription: bannerData.storeBannerDescription,
        storeBannerButtonText: bannerData.storeBannerButtonText,
        storeBannerImageUrl: bannerData.imageUrl, // from uploaded image
      };
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await POST(
        `${API_URL}/customise-store-banner?id=${parseLCData.uuid}`,
        payload
      );
      if (response?.status === 201) {
        setBannerData({
          storeBannerTitle: response?.data?.title,
          storeBannerDescription: response?.data?.description,
          imageUrl: response?.data?.imageUrl,
          storeBannerButtonText: response?.data?.buttonText,
          uuid: "",
        });
        toast.success("Banner updated successfully");
        setIsSavingData(false);
      }
    } catch (error: any) {
      console.log("Error creating banner:", error);

      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      }
      setIsSavingData(false);
    }
  };

  const handleDeleteImage = async (bannerData: any) => {
    try {
      const lcData = localStorage.getItem("user");
      const parseUserData = lcData && JSON.parse(lcData);

      const response = await DELETE(
        `customise-store-banner/image?uuid=${bannerData?.uuid}&userId=${parseUserData.uuid}`
      );
      if (response?.status === 200) {
        setBannerData((prev) => ({ ...prev, imageUrl: null }));
        toast.success("Image successfully deleted.");
        await deleteImageFromFirebase(bannerData.imageUrl);
      } else {
        toast.error("Failed to delete image. Try again.");
      }
    } catch (error: any) {
      toast.error("Failed to delete image. Try again.");
      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6">
      {/* Left Panel: Form Section */}
      <div
        className="lg:col-span-5 space-y-6 bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 
                  p-6 rounded-2xl shadow-lg border border-violet-100"
      >
        <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2 border-violet-200">
          Store Banner
        </h2>

        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Store Banner Title
          </label>
          <input
            type="text"
            name="storeBannerTitle"
            value={bannerData.storeBannerTitle}
            onChange={handleChange}
            placeholder="Enter banner title"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-violet-500 
                   shadow-sm transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Store Banner Description
          </label>
          <textarea
            name="storeBannerDescription"
            value={bannerData.storeBannerDescription}
            onChange={handleChange}
            rows={4}
            placeholder="Enter banner description"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-violet-500 
                   shadow-sm transition"
          />
        </div>

        {/* Upload Image */}
        {!bannerData?.imageUrl && (
          <div>
            <label
              className="block text-sm font-medium text-gray-800 mb-1"
              htmlFor="upload"
            >
              Upload Image
            </label>
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-700 border border-violet-200 rounded-xl p-2 
                     file:mr-4 file:py-2 file:px-4 file:rounded-full 
                     file:border-0 file:text-sm file:font-semibold 
                     file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-200 
                     shadow-sm"
            />
          </div>
        )}

        {/* Image Preview */}
        {bannerData.imageUrl && (
          <div className="mt-4 relative w-full max-w-xs">
            <span className="block text-sm font-medium text-gray-800 mb-2">
              Image Preview
            </span>
            <div className="relative border border-violet-200 rounded-xl overflow-hidden shadow-md">
              <img
                src={bannerData.imageUrl}
                alt="Banner Preview"
                className="w-full h-auto object-cover rounded-xl"
              />
              <button
                onClick={() => handleDeleteImage(bannerData)}
                title="Delete Image"
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md 
                       hover:bg-red-100 transition"
              >
                <TrashIcon className="w-5 h-5 text-red-600" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              To upload a new image, please delete the current one first.
            </p>
          </div>
        )}

        {/* Button Text */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Banner Button Text
          </label>
          <input
            type="text"
            name="storeBannerButtonText"
            value={bannerData.storeBannerButtonText}
            onChange={handleChange}
            placeholder="Enter button text"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-violet-500 
                   shadow-sm transition"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isUploading || isSavingData}
          className={`w-full py-3 rounded-xl font-medium transition shadow-md 
        ${
          isUploading || isSavingData
            ? "bg-violet-300 text-white opacity-70 cursor-not-allowed"
            : "bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-600 hover:to-indigo-600"
        }`}
        >
          {isUploading ? "Uploading..." : "Save Changes"}
        </button>
      </div>

      {/* Right Panel: Preview */}
      <div className="lg:col-span-7">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-violet-200 pb-2">
          Live Preview
        </h2>
        <StoreBannerPreview bannerData={bannerData} />
      </div>
    </div>
  );
};

export const StoreBannerPreview = ({ bannerData }: any) => {
  const { currentTheme } = useTheme();

  return (
    <section className="relative rounded-xl overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <div className="relative h-64 w-full">
        {" "}
        {/* Reduced height */}
        <img
          src={bannerData?.imageUrl || "/placeholder.svg?height=500&width=1200"}
          alt="Store banner"
          className="object-cover w-full h-full" /* Ensures full coverage */
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center p-6">
        {" "}
        {/* Added padding */}
        <div className="max-w-md">
          {" "}
          {/* Reduced max width */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {" "}
            {/* Reduced text size */}
            {bannerData?.storeBannerTitle}
          </h1>
          <p className="text-base text-white/90 mb-4">
            {" "}
            {/* Reduced text size */}
            {bannerData?.storeBannerDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              style={{ backgroundColor: currentTheme.primary }}
              className="text-sm px-4 py-2" /* Smaller button */
            >
              {bannerData?.storeBannerButtonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
