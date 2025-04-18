"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ImagePlus, Loader2, Plus, Upload, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductUploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [images, setImages] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    cost: "",
    inventory: "",
    sku: "",
    category: "",
    discount: "",
  })

  // Handle file input change
  const handleFileChange = (e) => {
    const files = e.target.files
    if (files) {
      handleFiles(Array.from(files))
    }
  }

  // Handle files from drop or input
  const handleFiles = (files) => {
    const newImages = []

    files.forEach((file) => {
      // Only accept images
      if (!file.type.match("image.*")) {
        toast({
          title: "Invalid file type",
          description: "Only image files are allowed",
          variant: "destructive",
        })
        return
      }

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        newImages.push({
          file,
          preview: e.target.result,
          id: Math.random().toString(36).substring(2, 11),
        })

        // Update state after all files are processed
        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  // Handle drop event
  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  // Remove image
  const removeImage = (id) => {
    setImages(images.filter((image) => image.id !== id))
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name, value) => {
    setProductData((prev) => ({ ...prev, [name]: value }))
  }

  // Simulate upload with progress
  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading(false)
            toast({
              title: "Product uploaded successfully",
              description: "Your product has been added to your store",
            })
            router.push("/dashboard/products")
          }, 500)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (images.length === 0) {
      toast({
        title: "No images selected",
        description: "Please upload at least one product image",
        variant: "destructive",
      })
      return
    }

    if (!productData.name || !productData.price) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    simulateUpload()
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="images" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="inventory">Inventory & Pricing</TabsTrigger>
          </TabsList>

          {/* Images Tab */}
          <TabsContent value="images">
            <Card>
              <CardContent className="pt-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-4 transition-all ${
                    dragActive ? "border-primary bg-primary/5" : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or WEBP (Max 5MB each)</p>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById("file-upload").click()}
                    >
                      <ImagePlus className="mr-2 h-4 w-4" />
                      Select Images
                    </Button>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Uploaded Images</h3>
                    <p className="text-sm text-gray-500 mb-3">The first image will be used as the product thumbnail</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {images.map((image, index) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden border">
                            <Image
                              src={image.preview || "/placeholder.svg"}
                              alt={`Product image ${index + 1}`}
                              width={200}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                              Main
                            </div>
                          )}
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="aspect-square rounded-md border-2 border-dashed flex items-center justify-center"
                        onClick={() => document.getElementById("file-upload").click()}
                      >
                        <Plus className="h-6 w-6 text-gray-400" />
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Product Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    value={productData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your product..."
                    className="min-h-[120px]"
                    value={productData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={productData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="home">Home & Kitchen</SelectItem>
                      <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                      <SelectItem value="toys">Toys & Games</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                      <SelectItem value="books">Books & Media</SelectItem>
                      <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                      <SelectItem value="food">Food & Beverages</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory & Pricing Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="pl-7"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comparePrice">Compare-at Price</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input
                        id="comparePrice"
                        name="comparePrice"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="pl-7"
                        value={productData.comparePrice}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost per item</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <Input
                        id="cost"
                        name="cost"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="pl-7"
                        value={productData.cost}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount Percentage</Label>
                    <div className="relative">
                      <Input
                        id="discount"
                        name="discount"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        value={productData.discount}
                        onChange={handleInputChange}
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inventory">Inventory</Label>
                    <Input
                      id="inventory"
                      name="inventory"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={productData.inventory}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                    <Input
                      id="sku"
                      name="sku"
                      placeholder="Enter SKU"
                      value={productData.sku}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.push("/dashboard/products")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading ({uploadProgress}%)
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
