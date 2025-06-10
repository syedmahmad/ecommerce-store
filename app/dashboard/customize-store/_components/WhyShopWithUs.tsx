"use client";
import { GET, PATCH, POST } from "@/app/utils/Axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { CheckCircle, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import imageCompression from "browser-image-compression";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/app/utils/ImageUploader";
import { useTheme } from "@/context/theme-context";

interface Feature {
  title: string;
  description: string;
  icon?: string; // URL to the uploaded icon
}

interface WhyShopWithUsData {
  sectionTitle: string;
  description: string;
  features: Feature[];
  userId?: string;
  uuid: string;
}

export const WhyShopWithUs = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [uploadingIcons, setUploadingIcons] = useState<Record<number, boolean>>(
    {}
  );

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.id) setUserId(user.id);
    } catch {
      console.error("Invalid user data in localStorage");
    }
  }, []);

  const { data: whyShopithUs } = useQuery({
    queryKey: ["why-shop-with-us-data", userId],
    queryFn: async () => {
      const endpoint = `why-shop-with-us?id=${userId}`;
      return GET(endpoint);
    },
    enabled: !!userId,
  });

  const whyShopWithUsData = whyShopithUs?.data;

  const [sectionTitle, setSectionTitle] = useState("Why Shop With Us");
  const [description, setDescription] = useState(
    "We're committed to providing the best shopping experience for our customers"
  );
  const [features, setFeatures] = useState<Feature[]>([
    { title: "Free Shipping", description: "Your Description here", icon: "" },
    {
      title: "Secure Payments",
      description: "Your Description here",
      icon: "",
    },
    { title: "24/7 Support", description: "Your Description here", icon: "" },
  ]);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (whyShopWithUsData?.[0]) {
      const data = whyShopWithUsData[0];
      setIsVisible(data?.showOnUI);
      setSectionTitle(data.sectionTitle || "Why Shop With Us");
      setDescription(
        data.description ||
          "We're committed to providing the best shopping experience for our customers"
      );
      setFeatures(
        Array.isArray(data.features) && data.features.length > 0
          ? data.features.map(({ title, description, icon }: Feature) => ({
              title,
              description,
              icon,
            }))
          : [
              { title: "Free Shipping", description: "Your Description here" },
              {
                title: "Secure Payments",
                description: "Your Description here",
              },
              { title: "24/7 Support", description: "Your Description here" },
            ]
      );
    }
  }, [whyShopWithUsData]);

  const handleFeatureChange = (
    index: number,
    key: keyof Feature,
    value: string
  ) => {
    setFeatures((prev) =>
      prev.map((feat, idx) =>
        idx === index ? { ...feat, [key]: value } : feat
      )
    );
  };

  const queryClient = useQueryClient();
  const reFetch = () => {
    queryClient.invalidateQueries({ queryKey: ["why-shop-with-us-data"] });
  };

  const handleSave = async () => {
    const lcData = localStorage.getItem("user");
    const parseLCData = lcData && JSON.parse(lcData);
    setIsSaving(true);
    const payload: WhyShopWithUsData = {
      sectionTitle,
      description,
      userId: userId || "",
      features,
      uuid: parseLCData.uuid,
    };

    try {
      const response = await POST(`/why-shop-with-us`, payload);
      if (response?.status === 201) {
        toast.success("Section saved successfully!");
        reFetch();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save section");
      console.error(
        "Error saving section:",
        error?.response?.data?.message || error.message
      );

      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleVisibility = async () => {
    const lcData = localStorage.getItem("user");
    const parseLCData = lcData && JSON.parse(lcData);

    const newVisibility = !isVisible;
    setIsVisible(newVisibility);

    const payload = {
      showOnUI: newVisibility,
    };

    handleSave();
    const response = await PATCH(
      `/why-shop-with-us/visibility/${parseLCData.id}`,
      payload
    );
    if (response?.status === 200) {
      toast.success(
        newVisibility
          ? "Section is now visible on the store."
          : "Section is now hidden from the store."
      );
    } else {
      toast.error("Failed to update visibility.");
    }
  };

  // const [uploadingIcons, setUploadingIcons] = useState<boolean[]>([]);

  const handleIconUpload = async (index: number, file: File) => {
    try {
      // Mark this index as uploading
      setUploadingIcons((prev) => ({ ...prev, [index]: true }));

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 100,
        useWebWorker: true,
      });

      const ext = compressedFile.name.split(".").at(-1);
      const path = `features/feature-${Date.now()}-${index}.${ext}`;
      const iconUrl = await uploadImageToFirebase(compressedFile, path);

      if (iconUrl) {
        const updatedFeatures = [...features];
        updatedFeatures[index].icon = iconUrl;
        setFeatures(updatedFeatures);
      }
    } catch (err) {
      console.error("Icon upload failed:", err);
      toast.error("Failed to upload icon");
    } finally {
      // Mark this index as not uploading
      setUploadingIcons((prev) => ({ ...prev, [index]: false }));
    }
  };

  const removeIcon = async (index: number, iconUrl: any) => {
    try {
      const result = await deleteImageFromFirebase(iconUrl);
      if (result) {
        toast.success("Image successfully deleted.");
        const updated = [...features];
        updated[index].icon = undefined;
        setFeatures(updated);
      } else {
        toast.error("Failed to delete image. Try again.");
      }
    } catch (error) {
      toast.error("Failed to delete image. Try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
      {/* Left Panel: Form Section */}
      <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Edit Section</h2>

          <div className="flex items-center space-x-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isVisible}
                onChange={handleVisibility}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>

            {/* Info Icon with Tooltip */}
            <div className="relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 18.5A6.5 6.5 0 105.5 12 6.5 6.5 0 0012 18.5z"
                />
              </svg>
              <div className="absolute z-10 w-64 px-3 py-2 text-sm text-white bg-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none">
                If you hide this section, it will not be visible in your store.
                Currently, this section is visible.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Section Title</span>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Description</span>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <div className="space-y-4">
            <span className="text-gray-700 font-medium">Features</span>
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 space-y-2 bg-gray-50"
              >
                {/* Icon Upload Section */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative group">
                    <label className="cursor-pointer">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {feature.icon ? (
                          <img
                            src={feature.icon}
                            alt={`${feature.title} icon`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Upload className="w-6 h-6 text-gray-500" />
                        )}
                        {uploadingIcons[index] && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleIconUpload(index, e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                    {feature.icon && (
                      <button
                        type="button"
                        onClick={() => removeIcon(index, feature.icon)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {feature.icon ? "Change icon" : "Upload icon"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Recommended: 100×100px
                    </p>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Feature title"
                  value={feature.title}
                  onChange={(e) =>
                    handleFeatureChange(index, "title", e.target.value)
                  }
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  rows={2}
                  placeholder="Feature description"
                  value={feature.description}
                  onChange={(e) =>
                    handleFeatureChange(index, "description", e.target.value)
                  }
                  className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Section"}
          </button>
        </div>
      </div>

      {/* Right Panel: Preview Section */}
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Live Preview</h2>
        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
          <WhyShopWithUsSection
            sectionTitle={sectionTitle}
            description={description}
            features={features}
            compact
          />
        </div>
      </div>
    </div>
  );
};

interface WhyShopWithUsSectionProps {
  sectionTitle: string;
  description: any;
  features: any[];
  compact?: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const titleAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const descriptionAnimation = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export const WhyShopWithUsSection = ({
  sectionTitle,
  description,
  features,
  compact = false,
}: WhyShopWithUsSectionProps) => {
  const { currentTheme } = useTheme();


  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`${compact ? "py-8" : "py-16"} bg-opacity-5`}
      style={{ backgroundColor: "var(--secondary-color)" }}
    >
      <div className="container mx-auto px-4">
        <>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className={`text-center ${compact ? "mb-6" : "mb-12"}`}
          >
            <motion.h2
              variants={titleAnimation}
              className={`${compact ? "text-2xl" : "text-3xl"} font-bold ${
                compact ? "mb-2" : "mb-4"
              }text-primary`}
              style={{
                color: currentTheme?.text,
              }}
            >
              {sectionTitle}
            </motion.h2>
            {description && (
              <motion.p
                variants={descriptionAnimation}
                className={`text-muted-foreground max-w-2xl mx-auto ${
                  compact ? "text-sm" : ""
                }`}
              >
                {description}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className={`grid grid-cols-1 md:grid-cols-3 ${
              compact ? "gap-4" : "gap-8"
            }`}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: compact ? -3 : -5,
                  transition: { duration: 0.2 },
                }}
                className={`bg-white bg-opacity-10 ${
                  compact ? "p-4" : "p-6"
                } rounded-lg shadow-sm hover:shadow-md transition-shadow`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: feature.icon ? "transparent" : "#2563EB",
                    color: "white",
                  }}
                >
                  {feature.icon ? (
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CheckCircle
                      className="w-6 h-6 text-white"
                      strokeWidth={2}
                    />
                  )}
                </motion.div>

                <h3
                  className={`${compact ? "text-lg" : "text-xl"} font-bold ${
                    compact ? "mb-1" : "mb-2"
                  } text-center`}
                  style={{
                    color: currentTheme?.text,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-muted-foreground ${
                    compact ? "text-sm" : ""
                  } text-center`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </>
      </div>
    </motion.section>
  );
};
