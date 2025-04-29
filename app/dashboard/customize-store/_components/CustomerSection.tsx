import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET, POST, DELETE, PUT, PATCH } from "@/app/utils/Axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export const CustomerSection = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  // const [needToFetchData, setNeedToFetchData] = useState(false)

  const queryClient = useQueryClient();
  const reFetch = () => {
    // fetch again so UI update automatically.
    queryClient.invalidateQueries({ queryKey: ["why-shop-with-us"] });
  };

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.id) setUserId(user.id);
    } catch {
      console.error("Invalid user data in localStorage");
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["our-customer-section", userId],
    queryFn: async () => {
      const endpoint = `our-customer-section/${userId}`;
      return GET(endpoint);
    },
    enabled: !!userId,
  });

  const ourCustomerData = data?.data;

  const [formData, setFormData] = useState({
    testimonial: "",
    name: "",
    status: "Verified",
    imageUrl: "",
    rating: 5,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const uploadForm = new FormData();
      uploadForm.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:3000/product/upload",
          uploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = response?.data;
        if (data?.url) {
          uploadedUrls.push(data.url);
        } else {
          console.error("Upload failed:", data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    if (uploadedUrls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: uploadedUrls[0],
      }));
    }
  };

  const handleAddOrUpdateCustomer = async () => {
    const lcData = localStorage.getItem("user");
    const parseLCData = lcData && JSON.parse(lcData);

    const payload = {
      name: formData.name,
      status: formData.status,
      testimonial: formData.testimonial,
      imageUrl: formData.imageUrl,
      rating: formData.rating,
      userId: parseLCData.id,
    };

    try {
      if (editId) {
        await PATCH(`/our-customer-section/${editId}`, payload);
        toast.success("Customer information updated successfully");
        reFetch();
      } else {
        await POST("/our-customer-section", payload);
        toast.success("Customer created successfully");
        reFetch();
      }

      // setNeedToFetchData(true);

      setFormData({
        testimonial: "",
        name: "",
        status: "Verified",
        imageUrl: "",
        rating: 5,
      });
      setEditId(null);
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const handleEdit = (customer: any) => {
    setFormData({
      name: customer.name,
      testimonial: customer.testimonial,
      status: customer.status,
      imageUrl: customer.imageUrl,
      rating: customer.rating,
    });
    setEditId(customer.id);
  };

  const handleDelete = async (id: string) => {
    try {
      await DELETE(`/our-customer-section/${id}`);
      reFetch();
      // setNeedToFetchData(true);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      <div className="space-y-6 p-4 border rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center">
          {editId ? "Edit" : "Add"} Customer Testimonial
        </h2>

        <label className="block">
          <span className="text-gray-700">Customer Testimonial</span>
          <textarea
            rows={4}
            name="testimonial"
            value={formData.testimonial}
            onChange={handleChange}
            placeholder="Enter customer feedback..."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Customer Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Sarah Johnson"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Customer Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Verified">Verified</option>
            <option value="Not Verified">Not Verified</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Customer Image</span>
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Uploaded"
              className="mt-2 h-24 w-24 object-cover rounded-full"
            />
          )}
        </label>

        <label className="block">
          <span className="text-gray-700">Star Rating</span>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={handleAddOrUpdateCustomer}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editId ? "Update" : "Add"} Customer
        </button>
      </div>

      {ourCustomerData?.length > 0 && (
        <div className="mt-10 space-y-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-center">
            Current Customer Testimonials
          </h3>
          {ourCustomerData.map((customer: any) => (
            <div
              key={customer.id}
              className="p-4 border rounded-md shadow-sm space-y-2 bg-white relative"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={customer.imageUrl}
                    alt={customer.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-bold">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.status}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <PencilIcon
                    className="w-5 h-5 text-blue-600 cursor-pointer"
                    onClick={() => handleEdit(customer)}
                  />
                  <TrashIcon
                    className="w-5 h-5 text-red-600 cursor-pointer"
                    onClick={() => handleDelete(customer.id)}
                  />
                </div>
              </div>
              <p className="text-gray-700 italic">"{customer.testimonial}"</p>
              <div className="flex space-x-1 text-yellow-500">
                {Array.from({ length: customer.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
