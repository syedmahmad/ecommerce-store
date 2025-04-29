"use client";
import { POST, GET } from "@/app/utils/Axios";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  useEffect(() => {
    if (saveBannerData) {
      setBannerData({
        storeBannerTitle: saveBannerData?.title,
        storeBannerDescription: saveBannerData?.description,
        imageUrl: saveBannerData?.imageUrl,
        storeBannerButtonText: saveBannerData?.buttonText,
      });
    }
  }, [saveBannerData]);

  const [bannerData, setBannerData] = useState({
    storeBannerTitle: "Welcome to Store",
    storeBannerDescription:
      "Discover our curated collection of premium products designed for your lifestyle.",
    imageUrl: null,
    storeBannerButtonText: "Shop Now",
  });

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Step 1: Read image dimensions before upload
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = async () => {
      const { width, height } = image;

      if (width !== 1200 || height !== 400) {
        toast.error("Please upload an image with size 1200x400 pixels.");
        URL.revokeObjectURL(objectUrl); // clean up
        return;
      }

      URL.revokeObjectURL(objectUrl); // clean up

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await POST(
          "http://localhost:3000/product/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = response?.data;
        console.log("data?.url", data?.url);
        if (data?.url) {
          setBannerData((prev) => ({
            ...prev,
            imageUrl: data.url,
          }));
          toast.success("Image uploaded successfully");
        } else {
          console.error("Image upload failed", data);
          toast.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Something went wrong while uploading.");
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

    console.log("bannerData", bannerData);

    try {
      const payload = {
        storeBannerTitle: bannerData.storeBannerTitle,
        storeBannerDescription: bannerData.storeBannerDescription,
        storeBannerButtonText: bannerData.storeBannerButtonText,
        storeBannerImageUrl: bannerData.imageUrl, // from uploaded image
      };

      const response = await POST(
        `http://localhost:3000/customise-store-banner?id=${parseLCData.id}`,
        payload
      );
      console.log("response", response?.data);
      if (response?.status === 201) {
        setBannerData({
          storeBannerTitle: response?.data?.title,
          storeBannerDescription: response?.data?.description,
          imageUrl: response?.data?.imageUrl,
          storeBannerButtonText: response?.data?.buttonText,
        });
        toast.success("Banner updated successfully");
      }
    } catch (error) {
      console.error("Error creating banner:", error);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Store Banner Title</span>
        <input
          type="text"
          name="storeBannerTitle"
          value={bannerData.storeBannerTitle}
          onChange={handleChange}
          placeholder="Enter banner title"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Store Banner Description</span>
        <textarea
          name="storeBannerDescription"
          value={bannerData.storeBannerDescription}
          onChange={handleChange}
          rows={3}
          placeholder="Enter banner description"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Banner Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </label>

      {bannerData.imageUrl && (
        <div className="mt-2">
          <span className="text-gray-700 block mb-1">Image Preview:</span>
          <img
            src={bannerData.imageUrl}
            alt="Banner Preview"
            className="max-w-full h-auto border rounded-md"
            height={200}
          />
        </div>
      )}

      <label className="block">
        <span className="text-gray-700">Banner Button Text</span>
        <input
          type="text"
          name="storeBannerButtonText"
          value={bannerData.storeBannerButtonText}
          onChange={handleChange}
          placeholder="Enter button text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </label>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-center"
      >
        Save Changes
      </button>
    </div>
  );
};
