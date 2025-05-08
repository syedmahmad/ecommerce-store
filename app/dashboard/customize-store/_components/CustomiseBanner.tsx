"use client";
import { POST, GET, DELETE } from "@/app/utils/Axios";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
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
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData && JSON.parse(lcData);
      if (user?.id) {
        setUserId(user.id);
      }
    }
  }, [userId]);

  const getBannerInfoData = useQuery({
    queryKey: ["banner-info"],
    queryFn: async () => {
      const endpoint = `customise-store-banner?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    image.onload = async () => {
      const { width, height } = image;
      console.log(`Uploaded image dimensions: ${width}x${height}`);

      if (width >= REQUIRED_WIDTH || height >= REQUIRED_HEIGHT) {
        toast.error(`Image must be ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT}px`);
        URL.revokeObjectURL(objectUrl);
        return;
      }

      URL.revokeObjectURL(objectUrl);

      try {
        setIsUploading(true);
        // Compress image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // try to reduce to 1MB
          maxWidthOrHeight: REQUIRED_WIDTH,
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

  const handleSave = async () => {
    const lcData = localStorage.getItem("user");
    const parseLCData = lcData && JSON.parse(lcData);

    try {
      const payload = {
        storeBannerTitle: bannerData.storeBannerTitle,
        storeBannerDescription: bannerData.storeBannerDescription,
        storeBannerButtonText: bannerData.storeBannerButtonText,
        storeBannerImageUrl: bannerData.imageUrl, // from uploaded image
      };
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await POST(
        `${API_URL}/customise-store-banner?id=${parseLCData.id}`,
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
      }
    } catch (error) {
      console.error("Error creating banner:", error);
    }
  };

  const handleDeleteImage = async (bannerData: any) => {
    try {
      // await deleteImageFromFirebase(bannerData.imageUrl);
      const response = await DELETE(
        `customise-store-banner/image?uuid=${bannerData?.uuid}`
      );
      if (response?.status === 200) {
        // Optionally reset local state
        setBannerData((prev) => ({ ...prev, imageUrl: null }));
        toast.success("Image successfully deleted.");
      } else {
        toast.error("Failed to delete image. Try again.");
      }
    } catch (error) {
      toast.error("Failed to delete image. Try again.");
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">
        Store Banner Settings
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Store Banner Title
        </label>
        <input
          type="text"
          name="storeBannerTitle"
          value={bannerData.storeBannerTitle}
          onChange={handleChange}
          placeholder="Enter banner title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Store Banner Description
        </label>
        <textarea
          name="storeBannerDescription"
          value={bannerData.storeBannerDescription}
          onChange={handleChange}
          rows={4}
          placeholder="Enter banner description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {bannerData?.imageUrl ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Current Image
          </label>
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg border">
            <span className="truncate max-w-sm text-sm text-gray-600">
              {bannerData?.imageUrl || "uploaded_image.jpg"}
            </span>
            <button
              onClick={() => handleDeleteImage(bannerData)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete to change
            </button>
          </div>
          <p className="text-xs text-gray-500">
            You must delete the current image before uploading a new one.
          </p>
        </div>
      ) : (
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="upload"
          >
            Upload Image
          </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      )}

      {bannerData.imageUrl && (
        <div className="mt-4 relative group w-full max-w-xs">
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Image Preview
          </span>
          <div className="relative border rounded-lg overflow-hidden shadow-sm">
            <img
              src={bannerData.imageUrl}
              alt="Banner Preview"
              className="w-full h-auto object-cover rounded-lg"
            />
            <button
              onClick={() => handleDeleteImage(bannerData)}
              title="Delete Image"
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100 transition"
            >
              <TrashIcon className="w-5 h-5 text-red-600" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            To upload a new image, please delete the current one first.
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Banner Button Text
        </label>
        <input
          type="text"
          name="storeBannerButtonText"
          value={bannerData.storeBannerButtonText}
          onChange={handleChange}
          placeholder="Enter button text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={isUploading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
      >
        {isUploading ? "Uploading......." : "Save Changes"}
      </button>
    </div>
  );
};
