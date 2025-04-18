"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductList } from "@/components/product-list";
import { Plus, Upload } from "lucide-react";

export const ProductsPage = () => {
  const [, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your store products</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/dashboard/products/mobile-upload">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Quick Add
            </Button>
          </Link>
          <Link href="/dashboard/products/upload">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div> */}

      <Tabs
        defaultValue="all"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            {/* <TabsTrigger value="active">Active</TabsTrigger> */}
            {/* <TabsTrigger value="draft">Drafts</TabsTrigger> */}
            {/* <TabsTrigger value="archived">Archived</TabsTrigger> */}
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-4">
          <ProductList />
        </TabsContent>

        {/* <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Products</CardTitle>
              <CardDescription>Products that are currently available in your store.</CardDescription>
            </CardHeader>
            <CardContent>

              <ProductList filterStatus="Active" />
            </CardContent>
          </Card>
        </TabsContent> */}

        {/* <TabsContent value="draft" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draft Products</CardTitle>
              <CardDescription>Products that are not yet published to your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No draft products</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  You don't have any draft products yet. Drafts let you save products without publishing them to your
                  store.
                </p>
                <Link href="/dashboard/products/upload">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Product
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Archived Products</CardTitle>
              <CardDescription>Products that have been archived and are not visible in your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No archived products</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  You don't have any archived products. Archived products are hidden from your store but can be
                  restored.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};
