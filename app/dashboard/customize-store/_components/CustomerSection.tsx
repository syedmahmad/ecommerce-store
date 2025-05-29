import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET, POST, DELETE, PUT, PATCH } from "@/app/utils/Axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/app/utils/ImageUploader";
import imageCompression from "browser-image-compression";
import { Star } from "lucide-react";
import { Loader2 } from "lucide-react";
import { AnyAaaaRecord } from "node:dns";

export const CustomerSection = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState([]);

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

  const queryClient = useQueryClient();
  const reFetch = () => {
    queryClient.invalidateQueries({
      queryKey: ["our-customer-section", userId],
    });
  };

  const ourCustomerData = data?.data;

  useEffect(() => {
    if (ourCustomerData && ourCustomerData?.length) {
      setCustomerData(ourCustomerData);
    }
  }, [ourCustomerData]);

  const [formData, setFormData] = useState({
    testimonial: "",
    name: "",
    status: "Verified",
    imageUrl: null,
    rating: 5,
    heading: "What Our Customers Say",
    subHeading:
      "Don't just take our word for it. Here's what our customers have to say about their shopping experience.",
    uuid: ourCustomerData?.testimonials_uuid || "",
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

  // Validate required fields
  const validateForm = () => {
    return (
      formData.name.trim() !== "" &&
      formData.testimonial.trim() !== "" &&
      formData.heading.trim() !== "" &&
      formData.subHeading.trim() !== ""
    );
  };

  const MAX_SIZE_MB = 5;
  const REQUIRED_WIDTH = 120;
  const REQUIRED_HEIGHT = 120;

  const [isUploading, setIsUploading] = useState(false);

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
      setIsUploading(true);

      try {
        // Compress image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // try to reduce to 1MB
          maxWidthOrHeight: REQUIRED_WIDTH,
          useWebWorker: true,
        });

        // Upload to Firebase
        const path = `customers/customer-${Date.now()}.${compressedFile.name
          .split(".")
          .pop()}`;
        const downloadURL = await uploadImageToFirebase(compressedFile, path);
        if (downloadURL) {
          uploadedUrls.push(downloadURL);
          setIsUploading(false);
        } else {
          console.error("Upload failed:", data);
          setIsUploading(false);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsUploading(false);
      }
    }

    if (uploadedUrls.length > 0) {
      setFormData((prev: any) => ({
        ...prev,
        imageUrl: uploadedUrls[0],
      }));
    }
  };

  const handleRemoveImage = async (formData: any) => {
    try {
      const result = await deleteImageFromFirebase(formData.imageUrl);
      if (result) {
        toast.success("Image successfully deleted.");
        setFormData((prev) => ({
          ...prev,
          imageUrl: null,
        }));
      } else {
        toast.error("Failed to delete image. Try again.");
      }
    } catch (error) {
      toast.error("Failed to delete image. Try again.");
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
      heading: formData.heading,
      subHeading: formData.subHeading,
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

      setFormData({
        testimonial: "",
        name: "",
        status: "Verified",
        imageUrl: null,
        rating: 5,
        heading: "What Our Customers Say",
        subHeading:
          "Don't just take our word for it. Here's what our customers have to say about their shopping experience.",
        uuid: "",
      });
      setEditId(null);
      reFetch();
    } catch (error: any) {
      console.error("Error saving testimonial:", error);
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

  const handleEdit = (customer: any) => {
    setFormData({
      name: customer.name,
      testimonial: customer.testimonial,
      status: customer.status,
      imageUrl: customer.imageUrl,
      rating: customer.rating,
      heading: customer.heading,
      subHeading: customer.subHeading,
      uuid: customer?.testimonials_uuid,
    });
    setEditId(customer.id);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await DELETE(`/our-customer-section/${id}`);
      if (response?.status === 200) {
        toast.success("Customer deleted successfully");
        setCustomerData(response?.data?.remaining);
        reFetch();
      } else {
        toast.error("Failed to delete customer. Try again.");
      }
    } catch (err: any) {
      console.error("Delete failed", err);
      if (err?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${err?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Customer Testimonials
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Form Section */}
        <div className="lg:col-span-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {editId ? "Edit" : "Add"} Customer Testimonial
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Heading <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                placeholder="What our customers say.."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {formData.heading.trim() === "" && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Subheading <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subHeading"
                value={formData.subHeading}
                onChange={handleChange}
                placeholder="Something about the section here.."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {formData.subHeading.trim() === "" && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Testimonial <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                name="testimonial"
                value={formData.testimonial}
                onChange={handleChange}
                placeholder="Enter customer feedback..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {formData.testimonial.trim() === "" && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Johnson"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {formData.name.trim() === "" && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Verified">Verified</option>
                <option value="Not Verified">Not Verified</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Image
              </label>
              <div className="flex items-center gap-4">
                {formData.imageUrl === null && (
                  <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors">
                    <span className="text-sm text-gray-600">Upload Image</span>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                )}
                {formData.imageUrl && (
                  <div className="relative">
                    <img
                      src={formData.imageUrl || "/avatar.png"}
                      alt="Uploaded"
                      className="h-16 w-16 object-cover rounded-full border-2 border-gray-200"
                    />
                    <button
                      onClick={() => handleRemoveImage(formData)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <XMarkIcon className="h-4 w-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Star Rating
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[5, 4, 3, 2, 1].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddOrUpdateCustomer}
              disabled={isUploading || !validateForm()}
              className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center gap-2 ${
                isUploading || !validateForm()
                  ? "bg-blue-400 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
              {editId ? "Update" : "Add"} Customer
            </button>
          </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Live Preview
            </h2>
            <CustomerLivePreview
              customerData={customerData}
              formData={formData}
            />
          </div>
        </div>
      </div>

      {/* Full Width Section: Testimonials List */}
      {customerData?.length > 0 && (
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Current Customer Testimonials
            </h3>
            <div className="space-y-4">
              {customerData.map((customer: any) => (
                <SingleCustomer
                  key={customer?.name}
                  customer={customer}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SingleCustomer = ({ customer, handleEdit, handleDelete }: any) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={customer.imageUrl ?? "/avatar.png"}
              alt={customer.name}
              className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            {customer.imageUrl && (
              <button
                onClick={() => handleEdit({ ...customer, imageUrl: "" })}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <XMarkIcon className="h-4 w-4 text-white" />
              </button>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900">{customer.name}</p>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                {customer.status}
              </span>
            </div>
            <div className="flex mt-1 mb-2 text-yellow-400">
              {Array.from({ length: customer.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic">"{customer.testimonial}"</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => handleEdit(customer)}
            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(customer.id)}
            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const CustomerLivePreview = ({ customerData, formData }: any) => {
  const hasPreviewTestimonial =
    formData.testimonial || formData.name || formData.imageUrl;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {formData.heading || "What Our Customers Say"}
        </h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          {formData.subHeading ||
            "Customer testimonials about their experience"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Preview testimonial */}
        {hasPreviewTestimonial && (
          <div className="bg-white p-4 rounded-lg border-2 border-dashed border-blue-200 shadow-sm">
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 mr-1"
                  fill={i < (formData.rating || 1) ? "#3B82F6" : "none"}
                  stroke="#3B82F6"
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm italic mb-4">
              {formData.testimonial || "Customer testimonial preview text..."}
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
                <img
                  src={formData.imageUrl ?? "/avatar.png"}
                  alt={formData.name || "Customer"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {formData.name || "Customer Name"}
                </h4>
                <p className="text-xs text-gray-500">
                  {formData.status || "Verified"}
                </p>
              </div>
            </div>
            <div className="text-xs text-blue-500 mt-2 text-center">
              (Preview - Not saved yet)
            </div>
          </div>
        )}

        {/* Existing testimonials */}
        {customerData.map((testimonial: any) => (
          <div
            key={testimonial.id}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 mr-1"
                  fill={i < testimonial.rating ? "#3B82F6" : "none"}
                  stroke="#3B82F6"
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm italic mb-4">
              {testimonial.testimonial}
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
                <img
                  src={
                    testimonial.imageUrl || "https://via.placeholder.com/120"
                  }
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {testimonial.name}
                </h4>
                <p className="text-xs text-gray-500">{testimonial.status}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {customerData.length === 0 && !hasPreviewTestimonial && (
          <div className="col-span-3 text-center py-8">
            <div className="bg-gray-50 rounded-lg p-8 border border-dashed border-gray-200">
              <p className="text-gray-500">No testimonials to display yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Add a testimonial using the form to see it here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
