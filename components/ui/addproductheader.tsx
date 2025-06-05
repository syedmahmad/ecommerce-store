"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Edit,
  MoreHorizontal,
  PackageOpen,
  Package,
  Plus,
  Trash,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AddProductHeader = ({
  products,
  setIsAddProductOpen,
  handleEditProduct,
  handleDeleteProduct,
}: any) => {
  return (
    <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 rounded-t-lg p-4 sm:p-6">
        <div className="flex-1">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span>Product Inventory</span>
          </CardTitle>
          <CardDescription className="mt-1 sm:mt-2 text-sm sm:text-base">
            Manage your products - add new items, update prices, and track
            inventory
          </CardDescription>
        </div>
        <Button
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-md"
          onClick={() => setIsAddProductOpen(true)}
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden xs:inline">Add New Product</span>
          <span className="xs:hidden">Add Product</span>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {products?.length > 0 ? (
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <Table className="hidden sm:table">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>In Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: any) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell>
                      <img
                        src={
                          product?.images?.[0]?.imageUrl || "/placeholder.svg"
                        }
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover border border-gray-200"
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
                      {product.discount > 0 ? (
                        <span className="text-green-600 font-medium">
                          {product.discount}% OFF
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {product.stock > 0 ? (
                        <span className="text-blue-600 font-medium">
                          {product.stock} available
                        </span>
                      ) : (
                        <span className="text-red-600">Out of stock</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status !== 0 && product.stock > 0
                            ? "default"
                            : "secondary"
                        }
                        className={
                          product.status !== 0 && product.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {product.status !== 0 && product.stock > 0
                          ? "Active"
                          : "Inactive"}
                      </Badge>
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
                          <DropdownMenuLabel>Product Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Remove Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-4 p-4">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={product?.images?.[0]?.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{product.name}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
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
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Price:</span>
                          <span>
                            {new Intl.NumberFormat("en-PK", {
                              style: "currency",
                              currency: "PKR",
                            }).format(product.price)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Discount:</span>
                          <span>
                            {product.discount > 0 ? (
                              <span className="text-green-600">
                                {product.discount}% OFF
                              </span>
                            ) : (
                              "-"
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Stock:</span>
                          <span>
                            {product.stock > 0 ? (
                              <span className="text-blue-600">
                                {product.stock} available
                              </span>
                            ) : (
                              <span className="text-red-600">Out of stock</span>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Status:</span>
                          <Badge
                            variant={
                              product.status !== 0 && product.stock > 0
                                ? "default"
                                : "secondary"
                            }
                            className={`text-xs ${
                              product.status !== 0 && product.stock > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {product.status !== 0 && product.stock > 0
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <PackageOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No Products Found</h3>
            <p className="text-sm text-gray-500 mb-4">
              You haven't added any products yet. Get started by adding your
              first product!
            </p>
            <Button
              onClick={() => setIsAddProductOpen(true)}
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Product
            </Button>
          </div>
        )}
      </CardContent>

      {products?.length > 0 && (
        <CardFooter className="bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center py-3 px-4 sm:px-6 gap-3">
          <p className="text-sm text-gray-600">
            Showing {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
          <Button
            variant="outline"
            onClick={() => setIsAddProductOpen(true)}
            className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Product
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
