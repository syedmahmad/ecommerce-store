"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

// Sample product data
// const initialProducts = [
//   {
//     id: 1,
//     name: "Leather Backpack",
//     price: 79.99,
//     inventory: 24,
//     status: "Active",
//     image: "/placeholder.svg?height=50&width=50",
//     description: "Stylish leather backpack with multiple compartments",
//     discount: 0,
//   },
//   {
//     id: 2,
//     name: "Wireless Headphones",
//     price: 129.99,
//     inventory: 15,
//     status: "Active",
//     image: "/placeholder.svg?height=50&width=50",
//     description: "Premium noise-cancelling wireless headphones",
//     discount: 10,
//   },
//   {
//     id: 3,
//     name: "Smart Watch",
//     price: 199.99,
//     inventory: 8,
//     status: "Low Stock",
//     image: "/placeholder.svg?height=50&width=50",
//     description: "Feature-rich smartwatch with health tracking",
//     discount: 0,
//   },
//   {
//     id: 4,
//     name: "Cotton T-Shirt",
//     price: 24.99,
//     inventory: 50,
//     status: "Active",
//     image: "/placeholder.svg?height=50&width=50",
//     description: "Comfortable 100% cotton t-shirt",
//     discount: 0,
//   },
//   {
//     id: 5,
//     name: "Ceramic Coffee Mug",
//     price: 14.99,
//     inventory: 32,
//     status: "Active",
//     image: "/placeholder.svg?height=50&width=50",
//     description: "Elegant ceramic coffee mug",
//     discount: 0,
//   },
// ];

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await POST(`${API_URL}/product/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Axios will manage this for FormData
          },
        });

        const data = response?.data; // Assuming the response is { url: "..." }
        if (data?.url) {
          uploadedUrls.push(data.url);
        } else {
          console.error("Upload failed:", data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setNewProduct((prev) => ({
      ...prev,
      imageUrls: [...(prev.imageUrls || []), ...uploadedUrls],
    }));
  };

  const handleBannerImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await POST(`${API_URL}/product/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response?.data;
      if (data?.url) {
        setNewProduct((prev) => ({
          ...prev,
          bannerImageUrl: data.url,
        }));
      } else {
        console.error("Banner image upload failed:", data);
      }
    } catch (error) {
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
    } catch (error) {
      console.error("Error adding product:", error);
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
    } catch (error) {
      console.error("Error updating product:", error);
      // Optionally show error feedback to the user
    }
  };

  // const handleDeleteProduct = (id: any) => {
  //   setProducts(products.filter((product) => product.id !== id));
  // };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await DELETE(`/product/${productId}`);

      // Remove from local state after successful delete
      const updatedProducts = products.filter((p: any) => p.id !== productId);
      setProducts(updatedProducts);
      toast.success("Product deleted successfully!");
      reFetch();
    } catch (error) {
      console.error("Failed to delete product:", error);
      // Optionally show a user-facing error message
    }
  };

  return (
    // <DashboardLayout>
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
                <TableHead className="w-[80px]">Image</TableHead>
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
                      <Image
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
                    <TableCell>${product.price.toFixed(2)}</TableCell>
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
        <DialogContent className="sm:max-w-auto lg:max-w-[925px]">
          <DialogHeader>
            <DialogTitle className="text-center mb-2">
              Add New Product
            </DialogTitle>
            <DialogDescription className="text-center mb-2">
              Add a new product to your store. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Name & Price */}
            <div className="flex gap-4">
              {/* Name */}
              <div className="flex-1 grid grid-cols-4 items-center gap-2">
                <Label htmlFor="name" className="text-right col-span-1">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>

              {/* Price */}
              <div className="flex-1 grid grid-cols-4 items-center gap-2">
                <Label htmlFor="price" className="text-right col-span-1">
                  Price
                </Label>
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
                  className="col-span-3"
                />
              </div>
            </div>

            {/* Stock & Status */}
            <div className="flex gap-4">
              {/* Stock */}
              <div className="flex-1 grid grid-cols-4 items-center gap-2">
                <Label htmlFor="stock" className="text-right col-span-1">
                  Stock
                </Label>
                <Input
                  id="stock"
                  value={newProduct.stock || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>

              {/* Status */}
              <div className="flex-1 grid grid-cols-4 items-center gap-2">
                <Label htmlFor="status" className="text-right col-span-1">
                  Status
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
                  className="col-span-3 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">Inactive</option>
                  <option value="1">Active</option>
                </select>
              </div>
            </div>

            {/* Discount & Description */}
            <div className="flex gap-4">
              {/* Discount */}
              <div className="flex-1 grid grid-cols-4 items-center gap-2">
                <Label htmlFor="discount" className="text-right col-span-1">
                  Discount
                </Label>
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
                  className="col-span-3"
                />
              </div>

              {/* Description */}
              <div className="flex-1 grid grid-cols-4 items-center gap-2">
                <Label htmlFor="description" className="text-right col-span-1">
                  Description
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
                  className="col-span-3"
                />
              </div>
            </div>

            {/* IS SALE ON & Upload Images */}
            <div className="flex gap-4">
              {/* IS SALE ON */}
              <div className="flex-1 grid grid-cols-4 items-center gap-2">
                <Label htmlFor="isOnSale" className="text-right col-span-1">
                  IS SALE ON
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
                  className="col-span-3 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/* Upload Images */}
              <div className="flex-1 grid grid-cols-4 items-center gap-2 ml-4">
                <Label htmlFor="imageUpload" className="text-right col-span-1">
                  Upload Images
                </Label>
                <input
                  id="imageUpload"
                  type="file"
                  name="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="col-span-3"
                />
              </div>
            </div>

            {newProduct.isOnSale === 1 && (
              <>
                <div className="flex gap-4">
                  {/* IS SALE ON */}
                  <div className="flex-1 grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="isOnSale" className="text-right col-span-1">
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
                      className="col-span-3"
                    />
                  </div>

                  <div className="flex-1 grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="edit-description" className="text-right">
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
                      className="col-span-3"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  {/* IS SALE ON */}

                  {/* Upload Images */}
                  <div className="flex-1 grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="imageUpload"
                      className="text-right col-span-1"
                    >
                      Banner Image
                    </Label>
                    <input
                      id="imageUpload"
                      type="file"
                      name="file"
                      accept="image/*"
                      multiple
                      onChange={handleBannerImageUpload}
                      className="col-span-3"
                    />
                  </div>

                  <div className="flex-1 grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="edit-description" className="text-right">
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
                      className="col-span-3"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="edit-description" className="text-right">
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
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex-1 grid grid-cols-4 items-center gap-2" />
                </div>
              </>
            )}

            {/* IS SALE ON */}
            {/* <div className="flex gap-4">

              <div className="flex-1 grid grid-cols-4 items-center gap-2">
                <Label htmlFor="discount" className="text-right col-span-1">
                  IS SALE ON
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
                  className="col-span-3 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">No</option>
                  <option value="1">YES</option>
                </select>
              </div>

            </div> */}

            {/* Upload Images (single field) */}
            {/* <div className="flex gap-4 ">
              <div className="flex-1 grid grid-cols-4 items-center gap-2">
                <Label htmlFor="imageUpload" className="text-right col-span-1">
                  Upload Images
                </Label>
                <input
                  id="imageUpload"
                  type="file"
                  name="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="col-span-3"
                />
              </div>


              <div className="flex-1" />
            </div> */}
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleAddProduct}>
              Save Product
            </Button>
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
    // </DashboardLayout>
  );
};
