import React, { useEffect, useState } from "react";
import { GET, POST, DELETE, PATCH } from "@/app/utils/Axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/app/utils/ImageUploader";
import imageCompression from "browser-image-compression";
import { MinusIcon, PlusIcon, Star } from "lucide-react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/context/theme-context";
import { useParams } from "next/navigation";

export const CustomerSection = () => {
  const params = useParams();
  const storeId = params.stor;

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

  const [showCustomerForm, setShowCustomerForm] = useState(false);

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

  const handleAddOrUpdateCustomer = async (e?: React.FormEvent) => {
    // Prevent default form submission if called from form
    if (e) e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    const lcData = localStorage.getItem("user");
    const parseLCData = lcData && JSON.parse(lcData);

    const payload = {
      name: formData.name,
      status: formData.status,
      testimonial: formData.testimonial,
      imageUrl: formData.imageUrl,
      rating: formData.rating,
      user_id: parseLCData.id,
      heading: formData.heading,
      subHeading: formData.subHeading,
      uuid: parseLCData.uuid,
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

  // #region to delete customer from DB.

  // function responsible for deleting customer form db

  const handleDelete = async (id: string) => {
    try {
      const lcData = localStorage.getItem("user");
      const parseLCData = lcData && JSON.parse(lcData);
      const response = await DELETE(
        `/our-customer-section/${id}?uuid=${parseLCData?.uuid}`
      );
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

  // #endregion

  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = async () => {
    const lcData = localStorage.getItem("user");
    const parseLCData = lcData && JSON.parse(lcData);

    const newVisibility = !isVisible;
    setIsVisible(newVisibility);

    const payload = {
      showOnUI: newVisibility,
      userId: parseLCData.id,
    };
    const response = await PATCH(
      `/our-customer-section/visibility/${parseLCData.id}`,
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Customer Testimonials
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Form Section */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow-md border border-violet-100 p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-violet-100 pb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Section
            </h2>

            {/* Visibility Toggle */}
            <div className="flex items-center space-x-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={handleVisibility}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-indigo-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5 shadow-sm"></div>
              </label>

              {/* Info Tooltip */}
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
                <div className="absolute z-10 w-64 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                  If you hide this section, it will not be visible in your
                  store.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* Section Heading */}
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
                className="w-full px-4 py-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              {formData.heading.trim() === "" && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            {/* Section Subheading */}
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
                className="w-full px-4 py-2 border border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {formData.subHeading.trim() === "" && (
                <p className="mt-1 text-sm text-red-600">
                  This field is required
                </p>
              )}
            </div>

            {/* Add Customer Button */}
            {!editId && (
              <button
                onClick={() => setShowCustomerForm(!showCustomerForm)}
                className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium py-2 px-4 rounded-lg hover:from-violet-600 hover:to-indigo-600 transition flex items-center justify-center gap-2 shadow-sm"
              >
                {showCustomerForm ? (
                  <>
                    <MinusIcon className="w-4 h-4" />
                    Cancel Adding Customer
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-4 h-4" />
                    Add Customer Testimonial
                  </>
                )}
              </button>
            )}

            {/* Customer Form */}
            {(editId || showCustomerForm) && (
              <div className="border border-violet-200 rounded-xl p-4 space-y-5 bg-gradient-to-br from-violet-50 via-white to-indigo-50 shadow-sm animate-fade-in">
                <h3 className="text-lg font-medium text-gray-900">
                  {editId ? "Edit Customer Testimonial" : "Add New Testimonial"}
                </h3>

                {/* Form Inputs */}
                {/* ... keep your testimonial, name, status, rating, image upload ... */}
                {/* just update borders → border-violet-200, focus → ring-violet-500/indigo-500 */}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() =>
                      editId ? setEditId(null) : setShowCustomerForm(false)
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddOrUpdateCustomer}
                    disabled={isUploading || !validateForm()}
                    className={`px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                      isUploading || !validateForm()
                        ? "bg-indigo-300 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-600 hover:to-indigo-600"
                    }`}
                  >
                    {isUploading && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {editId ? "Update" : "Add"} Customer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl shadow-md border border-violet-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Live Preview
            </h2>
            <CustomerLivePreview
              customerData={customerData}
              formData={formData}
            />
          </div>
        </div>
      </div>

      {/* Testimonials List */}
      {customerData?.length > 0 && (
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-md border border-violet-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
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
    <div className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={customer.imageUrl ?? "/avatar.png"}
              alt={customer.name}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
              <p className="font-medium text-gray-900 break-words">
                {customer.name}
              </p>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full self-start xs:self-auto">
                {customer.status}
              </span>
            </div>
            <div className="flex mt-1 mb-2 text-yellow-400">
              {Array.from({ length: customer.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic text-sm sm:text-base">
              "{customer.testimonial}"
            </p>
          </div>
        </div>
        <div className="flex justify-end sm:justify-normal space-x-2 sm:space-x-3">
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

export const CustomerLivePreview = ({ customerData, formData }: any) => {
  const { currentTheme } = useTheme();

  const hasPreviewTestimonial =
    formData.testimonial || formData.name || formData.imageUrl;

  // Combine existing testimonials with preview if it exists
  const allTestimonials = hasPreviewTestimonial
    ? [
        {
          id: "preview",
          ...formData,
          isPreview: true,
        },
        ...customerData,
      ]
    : customerData;

  // Chunk testimonials into rows of 3 for better layout
  const chunkedTestimonials = [];
  for (let i = 0; i < allTestimonials.length; i += 3) {
    chunkedTestimonials.push(allTestimonials.slice(i, i + 3));
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="text-center mb-12"
        >
          <motion.h2
            variants={titleAnimation}
            className="text-3xl font-bold mb-4"
            style={{
              color: currentTheme?.text,
            }}
          >
            {formData.heading || "What Our Customers Say"}
          </motion.h2>
          {formData.subHeading && (
            <motion.p
              variants={titleAnimation}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              {formData.subHeading}
            </motion.p>
          )}
        </motion.div>

        {
          chunkedTestimonials.length > 0
            ? chunkedTestimonials.map((row, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 last:mb-0"
                >
                  {row.map((testimonial: any) => (
                    <motion.div
                      key={testimonial.id}
                      variants={item}
                      whileHover={{ y: -5 }}
                      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all ${
                        testimonial.isPreview
                          ? "border-2 border-dashed border-blue-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 mr-1"
                            fill={
                              i < (testimonial.rating || 1)
                                ? "var(--accent-color)"
                                : "none"
                            }
                            style={{
                              color:
                                i < (testimonial.rating || 1)
                                  ? "var(--accent-color)"
                                  : "#d1d5db",
                            }}
                          />
                        ))}
                      </div>
                      <p className="mb-6 text-gray-600 dark:text-gray-300 italic">
                        "
                        {testimonial.testimonial ||
                          "Customer testimonial preview text..."}
                        "
                      </p>
                      <div className="flex items-center">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-white dark:border-gray-700 shadow">
                          <Image
                            src={testimonial.imageUrl || "/avatar.png"}
                            alt={testimonial.name || "Customer"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {testimonial.name || "Customer Name"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.status || "Verified"}
                          </p>
                        </div>
                      </div>
                      {testimonial.isPreview && (
                        <div className="text-xs text-blue-500 mt-2 text-center">
                          (Preview - Not saved yet)
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ))
            : null
          // <div className="col-span-3 text-center py-8">
          //   <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-dashed border-gray-200 dark:border-gray-700">
          //     <p className="text-gray-500 dark:text-gray-400">
          //       No testimonials to display yet
          //     </p>
          //     <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          //       Add a testimonial using the form to see it here
          //     </p>
          //   </div>
          // </div>
        }
      </div>
    </motion.section>
  );
};
