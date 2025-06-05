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
import { Button } from "@/components/ui/button";

export const UpdateStoreInfoAfterLogin = () => {
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
  console.log("storeInfoFromBE", getStoreInfo);

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
    contactNumber: `${storeInfoFromBE?.contactNumber}` || "",
    logo: storeInfoFromBE?.logoUrl || null,
    logoPreview: storeInfoFromBE?.logoUrl || null,
    uuid: "",
    location: storeInfoFromBE?.location ?? "",
  });

  useEffect(() => {
    if (storeInfoFromBE) {
      setStoreInfo({
        name: storeInfoFromBE?.name || "My Awesome Store",
        domain: storeInfoFromBE?.domain || "myawesomestore.com",
        description:
          storeInfoFromBE?.description ||
          "We sell the best products at the best prices!",
        contactNumber: storeInfoFromBE?.contactNumber || "",
        logo: storeInfoFromBE?.logoUrl || null,
        logoPreview: storeInfoFromBE?.logoUrl || null,
        uuid: storeInfoFromBE?.stores_uuid,
        location: storeInfoFromBE.location ?? "",
      });
    }
  }, [storeInfoFromBE]);

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const fileInputRef = useRef<any>(null);

  // Handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    // Validate contact number if it's being changed
    if (name === "contactNumber") {
      // Basic validation - you might want to enhance this
      if (!value.trim()) {
        setContactNumberError("Contact number is required");
      } else if (!/^[0-9+() -]*$/.test(value)) {
        setContactNumberError("Please enter a valid phone number");
      } else {
        setContactNumberError("");
      }
    }

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

      const response: any = await DELETE(`store/${storeInfo?.uuid}`);
      if (response?.status === 200) {
        toast.success("Image successfully deleted.");
        await deleteImageFromFirebase(storeInfo.logo);
        setStoreInfo((prev) => ({
          ...prev,
          logo: null,
          logoPreview: null,
        }));
        setIsRemoving(false);
      } else {
        console.log("response", response);
        toast.error("Failed to delete image. Try again.");
        setIsRemoving(false);
      }
    } catch (error: any) {
      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      } else {
        toast.error("Failed to delete image. Try again.");
      }
      setIsRemoving(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate contact number before submission
    if (!storeInfo.contactNumber.trim()) {
      setContactNumberError("Contact number is required");
      toast.error("Please provide a contact number");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const payload = {
        name: storeInfo.name,
        description: storeInfo.description,
        domain: storeInfo.domain,
        contactNumber: storeInfo.contactNumber,
        logoUrl: storeInfo.logo,
        location: storeInfo.location,
      };

      const response = await PATCH(`/store/${storeInfo.uuid}`, payload);
      if (response?.status === 200) {
        toast.success("Store information updated successfully!");
        reFetchStoreInfo();
        window.location.reload();
      }
    } catch (error: any) {
      setErrorMessage("Failed to update store information. Please try again.");
      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Update Your Store Information
          </h1>
          <div className="mt-3 flex justify-center">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-md flex items-start max-w-2xl mx-auto">
              <svg
                className="h-8 w-8 text-yellow-400 mr-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01"
                />
              </svg>
              <div>
                <h2 className="text-lg font-semibold text-yellow-800 mb-1">
                  Action Required: Complete Your Store Profile
                </h2>
                <p className="text-yellow-800 text-base">
                  Please review and update your store information below to
                  ensure your business appears professional and trustworthy to
                  customers. Completing these details will help personalize your
                  store and improve your brand presence.
                  <br />
                  <span className="font-medium">
                    Once finished, you will be redirected to your Dashboard
                    where you can further customize your store.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            {/* Left side - Form */}
            <div className="md:col-span-2">
              <div className="px-6 py-6 bg-white sm:p-6 shadow-lg rounded-xl border border-gray-100">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-8">
                    {/* Header Section */}
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Header Information
                      </h3>
                    </div>

                    {/* Store Name */}
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Store Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={storeInfo.name}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border pl-4"
                          placeholder="Your store name"
                        />
                      </div>
                    </div>

                    {/* Domain */}
                    <div className="space-y-1">
                      <label
                        htmlFor="domain"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Store Domain
                      </label>
                      <div className="flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm py-2.5">
                          https://
                        </span>
                        <input
                          type="text"
                          name="subdomain"
                          id="subdomain"
                          value={storeInfo.domain.split(".")[0]}
                          onChange={(e) => {
                            const domainParts = storeInfo.domain.split(".");
                            domainParts[0] = e.target.value;
                            handleInputChange({
                              target: {
                                name: "domain",
                                value: domainParts.join("."),
                              },
                            });
                          }}
                          className="block w-full min-w-0 flex-1 rounded-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border-y"
                        />
                        <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm py-2.5">
                          .{storeInfo.domain.split(".").slice(1).join(".")}
                        </span>
                      </div>
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-1">
                      <label
                        htmlFor="contactNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-500 text-sm">
                          +92
                        </span>
                        <input
                          type="tel"
                          name="contactNumber"
                          id="contactNumber"
                          value={storeInfo.contactNumber}
                          onChange={handleInputChange}
                          placeholder="3001234567"
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-12 p-2.5 border ${
                            contactNumberError ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {contactNumberError && (
                        <p className="mt-1 text-sm text-red-600">
                          {contactNumberError}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        This will be displayed to customers so they can contact
                        you
                      </p>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Store Logo
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-16 w-16 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
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
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                          {storeInfo.logo === null && (
                            <button
                              type="button"
                              onClick={triggerFileInput}
                              disabled={isLoading}
                              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              {isLoading ? "Uploading..." : "Upload Logo"}
                              {isLoading && (
                                <Loader2 className="ml-2 h-3 w-3 animate-spin" />
                              )}
                            </button>
                          )}
                          {storeInfo.logo !== null && (
                            <button
                              type="button"
                              onClick={() => removeLogo(storeInfo)}
                              disabled={isLoading || removing}
                              className={`inline-flex items-center rounded-md border px-3 py-2 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                isLoading || removing
                                  ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {removing ? "Removing..." : "Remove Logo"}
                              {removing && (
                                <Loader2 className="ml-2 h-3 w-3 animate-spin" />
                              )}
                            </button>
                          )}
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Recommended: 256×256px. Max size: 2MB.
                      </p>
                    </div>

                    {/* Footer Section */}
                    <div className="pt-6 border-t border-gray-200">
                      <div className="pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Footer Information
                        </h3>
                      </div>

                      {/* Store Physical Location */}
                      <div className="space-y-1 mb-4">
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Location
                        </label>
                        <textarea
                          id="location"
                          name="location"
                          rows={2}
                          value={storeInfo.location}
                          onChange={handleInputChange}
                          maxLength={45}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                          placeholder="Your store's physical address"
                        />
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">
                            Locate your physical location so users can visit
                            you.
                          </p>
                          <p className="text-xs text-gray-500">
                            {storeInfo.location.length}/45
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Store TagLine
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={2}
                          value={storeInfo?.description}
                          onChange={handleInputChange}
                          maxLength={45}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                          placeholder="Brief description for your store"
                        />
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">
                            Will appear in the footer section.
                          </p>
                          <p className="text-xs text-gray-500">
                            {storeInfo.description.length}/45
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    {successMessage && (
                      <div className="rounded-md bg-green-50 p-3 border border-green-100">
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-green-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <p className="text-sm font-medium text-green-800">
                            {successMessage}
                          </p>
                        </div>
                      </div>
                    )}
                    {errorMessage && (
                      <div className="rounded-md bg-red-50 p-3 border border-red-100">
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-red-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-sm font-medium text-red-800">
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right side - Preview */}
            <div className="mt-5 md:mt-0 md:col-span-1">
              <div className="px-6 py-6 bg-white sm:p-6 shadow-lg rounded-xl sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Store Preview
                </h2>

                <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Logo Preview */}
                    <div className="h-28 w-28 rounded-full bg-white border-2 border-gray-200 overflow-hidden mb-4 shadow-sm">
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
                    <h3 className="text-2xl font-bold text-gray-900">
                      {storeInfo.name}
                    </h3>

                    {/* Domain Preview */}
                    <p className="text-sm text-indigo-600 font-medium">
                      https://{storeInfo.domain}
                    </p>

                    {/* Contact Number Preview */}
                    {storeInfo.contactNumber ? (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">
                          Contact:
                        </p>
                        <p className="text-sm text-gray-600">
                          {storeInfo.contactNumber}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-2 p-2 bg-yellow-50 rounded-lg">
                        <p className="text-xs text-yellow-700">
                          No contact number provided (required)
                        </p>
                      </div>
                    )}

                    {/* Description Preview */}
                    <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                      {storeInfo.description ||
                        "No description provided yet..."}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Preview Notes
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• This is how customers will see your store</li>
                    <li>• Contact number is required for customer support</li>
                    <li>• Logo helps build brand recognition</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
