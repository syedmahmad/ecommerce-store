"use client";
import { GET, POST } from "@/app/utils/Axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const WhyShopWithUs = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // Get userId from localStorage only once on mount
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.id) setUserId(user.id);
    } catch {
      console.error("Invalid user data in localStorage");
    }
  }, []);

  // Fetch section data when userId is available
  const { data: whyShopithUs } = useQuery({
    queryKey: ["why-shop-with-us", userId],
    queryFn: async () => {
      const endpoint = `why-shop-with-us?id=${userId}`;
      return GET(endpoint);
    },
    enabled: !!userId,
  });

  const whyShopWithUsData = whyShopithUs?.data;

  // Local state
  const [sectionTitle, setSectionTitle] = useState("Why Shop With Us");
  const [description, setDescription] = useState(
    "We're committed to providing the best shopping experience for our customers"
  );
  const [features, setFeatures] = useState([
    { title: "Free Shipping", description: "" },
    { title: "Secure Payments", description: "" },
    { title: "24/7 Support", description: "" },
  ]);

  // Populate state when data is fetched
  useEffect(() => {
    if (whyShopWithUsData) {
      setSectionTitle(whyShopWithUsData[0]?.sectionTitle || "");
      setDescription(whyShopWithUsData[0]?.description || "");

      if (Array.isArray(whyShopWithUsData[0]?.features)) {
        setFeatures(
          whyShopWithUsData[0]?.features.map(({ title, description }: any) => {
            // console.log("Feature:", { title, description }); // Log each feature object
            return { title, description };
          })
        );
      } else {
        setFeatures([]);
      }
    }
  }, [whyShopithUs?.data]); // watch raw data, not derived data

  // Handle feature updates
  const handleFeatureChange = (index: number, key: string, value: string) => {
    setFeatures((prev) =>
      prev.map((feat, idx) =>
        idx === index ? { ...feat, [key]: value } : feat
      )
    );
  };


    const queryClient = useQueryClient();
    const reFetch = () => {
      // fetch again so UI update automatically.
      queryClient.invalidateQueries({ queryKey: ["why-shop-with-us"] });
    };
  

  // Save section
  const handleSave = async () => {
    const payload = {
      sectionTitle,
      description,
      userId,
      features,
    };

    try {
      const response = await POST(`/why-shop-with-us`, payload);
      if (response?.status === 200) {
        toast.success("Section saved successfully!");
        reFetch();
      }
      // Optionally, you can show a success message or update the UI
    } catch (error: any) {
      console.error(
        "Error saving section:",
        error?.response?.data || error.message
      );
    }
  };

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="text-gray-700 font-medium">Section Title</span>
        <input
          type="text"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Description</span>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </label>

      <div className="space-y-4">
        <span className="text-gray-700 font-medium">Features</span>
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-4 space-y-2"
          >
            <input
              type="text"
              placeholder="Feature title"
              value={feature.title}
              onChange={(e) =>
                handleFeatureChange(index, "title", e.target.value)
              }
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            <textarea
              rows={2}
              placeholder="Feature description"
              value={feature.description}
              onChange={(e) =>
                handleFeatureChange(index, "description", e.target.value)
              }
              className="block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

        {/* <button
          type="button"
          onClick={addFeature}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Feature
        </button> */}
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Save Section
      </button>
    </div>
  );
};
