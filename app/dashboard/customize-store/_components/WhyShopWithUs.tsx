"use client";
import { GET, POST } from "@/app/utils/Axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { CheckCircle } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

interface WhyShopWithUsData {
  sectionTitle: string;
  description: string;
  features: Feature[];
  userId?: string;
}

export const WhyShopWithUs = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.id) setUserId(user.id);
    } catch {
      console.error("Invalid user data in localStorage");
    }
  }, []);

  const { data: whyShopithUs } = useQuery({
    queryKey: ["why-shop-with-us", userId],
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
    { title: "Free Shipping", description: "Your Description here" },
    { title: "Secure Payments", description: "Your Description here" },
    { title: "24/7 Support", description: "Your Description here" },
  ]);

  useEffect(() => {
    if (whyShopWithUsData?.[0]) {
      const data = whyShopWithUsData[0];
      setSectionTitle(data.sectionTitle || "Why Shop With Us");
      setDescription(
        data.description ||
          "We're committed to providing the best shopping experience for our customers"
      );
      setFeatures(
        Array.isArray(data.features) && data.features.length > 0
          ? data.features.map(({ title, description }: Feature) => ({
              title,
              description,
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
    queryClient.invalidateQueries({ queryKey: ["why-shop-with-us"] });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const payload: WhyShopWithUsData = {
      sectionTitle,
      description,
      userId: userId || "",
      features,
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
        error?.response?.data || error.message
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
      {/* Left Panel: Form Section */}
      <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">Edit Section</h2>

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
  description: string;
  features: Feature[];
  compact?: boolean;
}

export const WhyShopWithUsSection = ({
  sectionTitle,
  description,
  features,
  compact = false,
}: WhyShopWithUsSectionProps) => {
  return (
    <section
      className={`${compact ? "py-8" : "py-12"} bg-opacity-5`}
      style={{ backgroundColor: "var(--secondary-color)" }}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center ${compact ? "mb-6" : "mb-8"}`}>
          <h2
            className={`${compact ? "text-2xl" : "text-3xl"} font-bold ${
              compact ? "mb-2" : "mb-4"
            }`}
          >
            {sectionTitle}
          </h2>
          <p
            className={`text-muted-foreground max-w-2xl mx-auto ${
              compact ? "text-sm" : ""
            }`}
          >
            {description}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 ${
            compact ? "gap-4" : "gap-6"
          }`}
        >
          {features?.map((feature, index) => (
            <div key={index} className="text-center">
              <div
                className={`${compact ? "w-12 h-12" : "w-16 h-16"} mx-auto ${
                  compact ? "mb-2" : "mb-4"
                } rounded-full flex items-center justify-center`}
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                <CheckCircle
                  className={compact ? "w-5 h-5" : "w-6 h-6"}
                  strokeWidth={2}
                />
              </div>
              <h3
                className={`${compact ? "text-lg" : "text-xl"} font-bold ${
                  compact ? "mb-1" : "mb-2"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-muted-foreground ${compact ? "text-sm" : ""}`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
