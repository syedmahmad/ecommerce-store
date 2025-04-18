"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Camera, Loader2, Upload } from "lucide-react"

export default function MobileUploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [image, setImage] = useState(null)
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    inventory: "1",
  })

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.match("image.*")) {
        toast({
          title: "Invalid file type",
          description: "Only image files are allowed",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setImage({
          file,
          preview: e.target.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
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

    if (!image) {
      toast({
        title: "No image selected",
        description: "Please take or upload a product image",
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
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2">Quick Add Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            {image ? (
              <div className="relative w-full max-w-sm">
                <Image
                  src={image.preview || "/placeholder.svg"}
                  alt="Product preview"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={() => setImage(null)}
                >
                  Change Image
                </Button>
              </div>
            ) : (
              <div className="w-full max-w-sm">
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center py-6">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="mb-2 text-sm text-gray-500 text-center">Take a photo or upload from your gallery</p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("camera-input").click()}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Take Photo
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload").click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                  <input
                    id="camera-input"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              </div>
            )}
          </div>

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
            <Label htmlFor="inventory">Quantity</Label>
            <Input
              id="inventory"
              name="inventory"
              type="number"
              min="1"
              placeholder="1"
              value={productData.inventory}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading ({uploadProgress}%)
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </div>
  )
}
