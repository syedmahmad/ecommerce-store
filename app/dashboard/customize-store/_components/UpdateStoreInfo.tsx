import { DELETE, GET, PATCH } from "@/app/utils/Axios";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/app/utils/ImageUploader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { Loader2 } from "lucide-react";

export const UpdateStoreInfo = () => {
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

  const getStoreInfo = useQuery({
    queryKey: ["store-info"],
    queryFn: async () => {
      const endpoint = `store/${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const storeInfoFromBE = getStoreInfo?.data?.data;

  const queryClient = useQueryClient();
  const reFetchStoreInfo = () => {
    queryClient.invalidateQueries({
      queryKey: ["store-info", userId],
    });
  };

  // State for form fields
  const [storeInfo, setStoreInfo] = useState({
    name: storeInfoFromBE?.name || "My Awesome Store",
    domain: storeInfoFromBE?.domain || "myawesomestore.com",
    description:
      storeInfoFromBE?.description ||
      "We sell the best products at the best prices!",
    logo: storeInfoFromBE?.logoUrl || null,
    logoPreview: storeInfoFromBE?.logoUrl || null,
    uuid: "",
  });

  useEffect(() => {
    if (storeInfoFromBE) {
      setStoreInfo({
        name: storeInfoFromBE?.name || "My Awesome Store",
        domain: storeInfoFromBE?.domain || "myawesomestore.com",
        description:
          storeInfoFromBE?.description ||
          "We sell the best products at the best prices!",
        logo: storeInfoFromBE?.logoUrl || null,
        logoPreview: storeInfoFromBE?.logoUrl || null,
        uuid: storeInfoFromBE?.stores_uuid,
      });
    }
  }, [storeInfoFromBE]);

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<any>(null);

  // Handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setStoreInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef?.current.click();
  };

  const MAX_SIZE_MB = 5;
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    // Check size
    // @ts-ignore
    if (files.size / 1024 / 1024 > MAX_SIZE_MB) {
      toast.error("Image must be smaller than 5MB");
      return;
    }
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const uploadForm = new FormData();
      uploadForm.append("file", file);

      try {
        setIsLoading(true);
        // Compress image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // try to reduce to 1MB
          maxWidthOrHeight: 256,
          useWebWorker: true,
        });

        // Upload to Firebase
        const path = `store-logo/storeLogo-${Date.now()}.${compressedFile.name
          .split(".")
          .pop()}`;
        const downloadURL = await uploadImageToFirebase(compressedFile, path);
        if (downloadURL) {
          uploadedUrls.push(downloadURL);
          setIsLoading(false);
        } else {
          console.error("Upload failed:");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsLoading(false);
      }
    }

    if (uploadedUrls.length > 0) {
      setStoreInfo((prev) => ({
        ...prev,
        logo: uploadedUrls[0],
        logoPreview: uploadedUrls[0],
      }));
    }
  };

  const [removing, setIsRemoving] = useState(false);
  const removeLogo = async (storeInfo: any) => {
    try {
      setIsRemoving(true);
      await deleteImageFromFirebase(storeInfo.logo);
      const response: any = await DELETE(`store/${storeInfo?.uuid}`);
      if (response?.status === 200) {
        toast.success("Image successfully deleted.");
        setStoreInfo((prev) => ({
          ...prev,
          logo: null,
          logoPreview: null,
        }));
        setIsRemoving(false);
      } else {
        toast.error("Failed to delete image. Try again.");
        setIsRemoving(false);
      }
    } catch (error) {
      toast.error("Failed to delete image. Try again.");
      setIsRemoving(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const payload = {
        name: storeInfo.name,
        description: storeInfo.description,
        domain: storeInfo.domain,
        logoUrl: storeInfo.logo,
      };

      const response = await PATCH(`/store/${storeInfo.uuid}`, payload);
      if (response?.status === 200) {
        toast.success("Store information updated successfully!");
        reFetchStoreInfo();
      }
    } catch (error) {
      setErrorMessage("Failed to update store information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Store Settings
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Update your store information and branding
          </p>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            {/* Left side - Form */}
            <div className="md:col-span-2">
              <div className="px-4 py-5 bg-white sm:p-6 shadow sm:rounded-lg">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Store Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Store Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={storeInfo.name}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                      </div>
                    </div>

                    {/* Domain */}
                    <div>
                      <label
                        htmlFor="domain"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Store Domain
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                          https://
                        </span>
                        <input
                          type="text"
                          name="domain"
                          id="domain"
                          value={storeInfo.domain}
                          onChange={handleInputChange}
                          className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                      </div>
                    </div>

                    {/* Logo Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Store Logo
                      </label>
                      <div className="mt-1 flex items-center space-x-4">
                        <div className="flex-shrink-0 h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                          <img
                            className="h-full w-full object-cover"
                            src={
                              storeInfo.logoPreview === null
                                ? "/avatar.png"
                                : storeInfo.logoPreview
                            }
                            alt="Store logo"
                          />
                        </div>
                        <div className="flex space-x-2">
                          {storeInfo.logo === null && (
                            <button
                              type="button"
                              onClick={triggerFileInput}
                              disabled={isLoading}
                              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Change
                            </button>
                          )}
                          {storeInfo.logo !== null && (
                            <p className="text-sm text-gray-600">
                              To upload a new logo, please remove the existing
                              one first.
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={() => removeLogo(storeInfo)}
                            disabled={isLoading || storeInfo.logo === null}
                            className={`inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
    ${
      isLoading || storeInfo.logo === null
        ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }
  `}
                          >
                            {removing ? "Removing..." : "Remove"}
                            {removing && (
                              <Loader2 className="ml-2 h-3 w-3 animate-spin text-primary" />
                            )}
                          </button>
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Recommended size: 256x256 pixels. Max file size: 2MB.
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Store TagLine
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={storeInfo.description}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your store. This will appear in
                        various places.
                      </p>
                    </div>

                    {/* Messages */}
                    {successMessage && (
                      <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                              {successMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {errorMessage && (
                      <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">
                              {errorMessage}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right side - Preview */}
            <div className="mt-5 md:mt-0 md:col-span-1">
              <div className="px-4 py-5 bg-white sm:p-6 shadow sm:rounded-lg sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Live Preview
                </h2>

                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Logo Preview */}
                    <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden mb-4">
                      <img
                        className="h-full w-full object-cover"
                        src={
                          storeInfo.logoPreview === null
                            ? "/avatar.png"
                            : storeInfo.logoPreview
                        }
                        alt="Store logo preview"
                      />
                    </div>

                    {/* Store Name Preview */}
                    <h3 className="text-xl font-bold text-gray-900">
                      {storeInfo.name}
                    </h3>

                    {/* Domain Preview */}
                    <p className="text-sm text-indigo-600 mt-1">
                      https://{storeInfo.domain}
                    </p>

                    {/* Description Preview */}
                    <p className="text-gray-600 mt-4 text-sm">
                      {storeInfo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
