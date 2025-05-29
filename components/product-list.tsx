"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import imageCompression from "browser-image-compression";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import { DELETE, GET, PATCH, POST } from "@/app/utils/Axios";
import { toast } from "react-toastify";
import { DashboardLayout } from "./dashboard-layout";
import { uploadImageToFirebase } from "@/app/utils/ImageUploader";

export const ProductList = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const lcData = localStorage.getItem("user");
      const user = lcData ? JSON.parse(lcData) : null;
      if (user?.id) {
        setUserId(user.id);
      }
    }
  }, []);

  const queryClient = useQueryClient();
  const reFetch = () => {
    // fetch again so UI update automatically.
    queryClient.invalidateQueries({ queryKey: ["get-product"] });
  };

  const getAllProducts = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const endpoint = `product?id=${userId}`;
      return await GET(endpoint);
    },
    enabled: !!userId,
  });

  const productsData = getAllProducts?.data?.data;

  useEffect(() => {
    if (userId && productsData?.length) {
      setProducts(productsData);
    }
  }, [userId, productsData]);

  const [products, setProducts] = useState<any[]>(productsData);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    discount: 0,
    stock: "",
    status: 0,
    imageUrls: [] as string[], // optional, can start as empty array
    isOnSale: 0,
    saleTitle: "",
    saleDescription: "",
    startDate: "",
    endDate: "",
    bannerImageUrl: "",
  });

  const MAX_SIZE_MB = 5;
  const REQUIRED_WIDTH = 1536;
  const REQUIRED_HEIGHT = 1024;

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true); // 🔒 Block UI actions here
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      // Size check
      if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
        toast.error(`${file.name} must be smaller than ${MAX_SIZE_MB}MB`);
        continue;
      }

      // Validate dimensions
      // const objectUrl = URL.createObjectURL(file);
      // const image = new Image();

      // const isValid = await new Promise<boolean>((resolve) => {
      //   image.onload = () => {
      //     const { width, height } = image;
      //     console.log(`Uploaded image dimensions: ${width}x${height}`);
      //     if (width !== REQUIRED_WIDTH || height !== REQUIRED_HEIGHT) {
      //       toast.error(
      //         `${file.name} must be ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT}px`
      //       );
      //       resolve(false);
      //       setIsUploading(false);
      //     } else {
      //       resolve(true);
      //     }
      //     URL.revokeObjectURL(objectUrl);
      //   };

      //   image.onerror = () => {
      //     toast.error(`${file.name} is not a valid image.`);
      //     URL.revokeObjectURL(objectUrl);
      //     resolve(false);
      //     setIsUploading(false);
      //   };

      //   image.src = objectUrl;
      // });

      // if (!isValid) continue;

      try {
        // Compress image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: REQUIRED_WIDTH,
          useWebWorker: true,
        });

        // Upload to Firebase
        const path = `products/product-${Date.now()}.${compressedFile.name
          .split(".")
          .pop()}`;
        const downloadURL = await uploadImageToFirebase(compressedFile, path);
        uploadedUrls.push(downloadURL);
      } catch (error) {
        console.error(`Failed to upload ${file.name}`, error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    if (uploadedUrls.length) {
      setNewProduct((prev) => ({
        ...prev,
        imageUrls: [...(prev.imageUrls || []), ...uploadedUrls],
      }));
      toast.success("Images uploaded successfully");
      setIsUploading(false); // ✅ Done uploading — unblock UI
    }
  };

  const handleBannerImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);

    try {
      // Compress image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: REQUIRED_WIDTH,
        useWebWorker: true,
      });

      // Upload to Firebase
      const path = `products/product-${Date.now()}.${compressedFile.name
        .split(".")
        .pop()}`;
      const downloadURL = await uploadImageToFirebase(compressedFile, path);
      // uploadedUrls.push(downloadURL);
      // const API_URL = process.env.NEXT_PUBLIC_API_URL;
      // const response = await POST(`${API_URL}/product/upload`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // const data = response?.data;
      if (downloadURL) {
        toast.success("Sale Banner Image Uploaded Successfully.");
        setNewProduct((prev) => ({
          ...prev,
          bannerImageUrl: downloadURL,
        }));
        setIsUploading(false);
      } else {
        console.error("Banner image upload failed:", downloadURL);
      }
    } catch (error) {
      setIsUploading(false);
      console.error("Error uploading banner image:", error);
    }
  };

  const handleAddProduct = async () => {
    const lcData = localStorage.getItem("user");
    const user = lcData && JSON.parse(lcData);
    try {
      const response = await POST(`/product?id=${user.id}`, newProduct);

      if (response?.status === 201 || response?.status === 200) {
        // Clear the form if the product was created successfully
        reFetch();
        setNewProduct({
          name: "",
          price: 0,
          description: "",
          discount: 0,
          status: 0,
          imageUrls: [],
          stock: "",
          isOnSale: 0,
          saleTitle: "",
          saleDescription: "",
          startDate: "",
          endDate: "",
          bannerImageUrl: "",
        });
        setIsAddProductOpen(false);

        toast.success("Product added!");
      } else {
        console.error("Product creation failed:", response?.data);
      }
    } catch (error: any) {
      console.error("Error adding product:", error);
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

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setIsEditProductOpen(true);
  };

  const saveEditedProduct = async () => {
    if (!currentProduct || !currentProduct.id) return;

    try {
      const response = await PATCH(
        `/product/${currentProduct.id}`,
        currentProduct
      );

      // Assuming backend returns the updated product
      const updatedProduct = response?.data;

      // Update product list with the new product data
      const updatedProducts = products.map((p: any) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );

      setProducts(updatedProducts);
      toast.success("Product updated successfully!");
      reFetch();
      setIsEditProductOpen(false);
    } catch (error: any) {
      console.error("Error updating product:", error);
      // Optionally show error feedback to the user
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
  const handleDeleteProduct = async (productId: number) => {
    try {
      await DELETE(`/product/${productId}`);

      // Remove from local state after successful delete
      const updatedProducts = products.filter((p: any) => p.id !== productId);
      setProducts(updatedProducts);
      toast.success("Product deleted successfully!");
      reFetch();
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      if (error?.response?.data?.message === "Unauthorized") {
        toast.warn(
          `${error?.response?.data?.message} access. Try reloading the page or logout then login back.`,
          {
            autoClose: false,
          }
        );
      }
      // Optionally show a user-facing error message
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription className="mt-2">
              Manage your product inventory, prices, and details.
            </CardDescription>
          </div>
          <Button className="ml-auto" onClick={() => setIsAddProductOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">new Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.length > 0 &&
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product?.images[0]?.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-PK", {
                        style: "currency",
                        currency: "PKR",
                      }).format(product.price)}
                    </TableCell>
                    <TableCell>
                      {product.discount > 0 ? `${product.discount}%` : "-"}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          product.status !== 0 && product.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status !== 0 && product.stock > 0
                          ? "Active"
                          : "In Active"}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[95vw] lg:max-w-[925px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-gray-800 mb-1">
              Add New Product
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mb-4">
              Fill in the product details below. All fields are required unless
              marked optional.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Section 1: Basic Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-gray-700 mb-4">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    placeholder="Enter product name"
                    className="w-full"
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700 font-medium">
                    Price <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                      ₨
                    </span>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: Number(e.target.value),
                        })
                      }
                      placeholder="0.00"
                      className="w-full pl-8"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-gray-700 font-medium">
                    Stock Quantity
                  </Label>
                  <Input
                    id="stock"
                    value={newProduct.stock || ""}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    placeholder="Enter stock quantity"
                    type="number"
                    min="0"
                    className="w-full"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-gray-700 font-medium">
                    Status <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="status"
                    value={newProduct.status ?? "0"}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        status: parseInt(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="0">Inactive</option>
                    <option value="1">Active</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-gray-700 mb-4">
                Description
              </h3>
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-gray-700 font-medium"
                >
                  Product Description
                </Label>
                <Textarea
                  id="description"
                  value={newProduct.description || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter detailed product description"
                  className="min-h-[120px]"
                />
              </div>
            </div>

            {/* Section 3: Discount & Images */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-gray-700 mb-4">
                Media & Pricing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Discount */}
                <div className="space-y-2">
                  <Label
                    htmlFor="discount"
                    className="text-gray-700 font-medium"
                  >
                    Discount (optional)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">
                      %
                    </span>
                    <Input
                      id="discount"
                      type="number"
                      placeholder="0"
                      value={newProduct.discount || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          discount: Number(e.target.value),
                        })
                      }
                      className="w-full pl-8"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <Label
                    htmlFor="imageUpload"
                    className="text-gray-700 font-medium"
                  >
                    Product Images <span className="text-red-500">*</span>
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
                    <input
                      id="imageUpload"
                      type="file"
                      name="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Upload high-quality product images (max 5MB each)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Sale Settings */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg text-gray-700">
                  Sale Settings
                </h3>
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="isOnSale"
                    className="text-gray-700 font-medium"
                  >
                    Enable Sale
                  </Label>
                  <select
                    id="isOnSale"
                    value={newProduct.isOnSale ?? "0"}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        isOnSale: parseInt(e.target.value, 10),
                      })
                    }
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              </div>

              {newProduct.isOnSale === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sale Title */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="saleTitle"
                        className="text-gray-700 font-medium"
                      >
                        Sale Title
                      </Label>
                      <Input
                        id="saleTitle"
                        value={newProduct.saleTitle || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            saleTitle: e.target.value,
                          })
                        }
                        placeholder="e.g., Summer Sale"
                        className="w-full"
                      />
                    </div>

                    {/* Banner Image */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="bannerImage"
                        className="text-gray-700 font-medium"
                      >
                        Banner Image
                      </Label>
                      <input
                        id="bannerImage"
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleBannerImageUpload}
                        className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  {/* Sale Description */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="saleDescription"
                      className="text-gray-700 font-medium"
                    >
                      Sale Description
                    </Label>
                    <Textarea
                      id="saleDescription"
                      value={newProduct.saleDescription || ""}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          saleDescription: e.target.value,
                        })
                      }
                      placeholder="Describe the sale promotion"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Start Date */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="startDate"
                        className="text-gray-700 font-medium"
                      >
                        Start Date
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newProduct.startDate}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            startDate: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="endDate"
                        className="text-gray-700 font-medium"
                      >
                        End Date
                      </Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newProduct.endDate}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            endDate: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="px-4 py-3 bg-gray-50 rounded-b-lg border-t">
            <button
              type="button"
              onClick={() => setIsAddProductOpen(false)}
              className="px-4 py-2 rounded-md text-gray-700 font-medium bg-white border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleAddProduct}
              disabled={isUploading}
              className={`px-6 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors duration-200`}
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Product"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center font-medium">
              Edit Product
            </DialogTitle>
            <DialogDescription className="text-center mt-2">
              Make changes to your product here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentProduct.name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: Number.parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-inventory" className="text-right">
                  Inventory
                </Label>
                <Input
                  id="edit-inventory"
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      stock: Number.parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-discount" className="text-right">
                  Discount %
                </Label>
                <Input
                  id="edit-discount"
                  type="number"
                  value={currentProduct.discount}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      discount: Number.parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={currentProduct.description}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Active
                </Label>
                <Switch
                  id="edit-status"
                  checked={currentProduct.status === 1}
                  onCheckedChange={(checked) =>
                    setCurrentProduct({
                      ...currentProduct,
                      status: checked ? 1 : 0,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={saveEditedProduct}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
