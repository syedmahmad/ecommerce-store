"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, MoreHorizontal, Plus, Trash, X } from "lucide-react";
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
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] sm:w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="whitespace-nowrap">Price</TableHead>
                <TableHead className="whitespace-nowrap">Discount</TableHead>
                <TableHead className="whitespace-nowrap">Inventory</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.length > 0 ? (
                products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={
                          product?.images?.[0]?.imageUrl || "/placeholder.svg"
                        }
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {product.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {new Intl.NumberFormat("en-PK", {
                        style: "currency",
                        currency: "PKR",
                      }).format(product.price)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {product.discount > 0 ? `${product.discount}%` : "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {product.stock}
                    </TableCell>
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
                          : "Inactive"}
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
