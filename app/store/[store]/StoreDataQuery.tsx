"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import StoreLayout from "@/components/store-layout";
import { useTheme } from "@/context/theme-context";
import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/utils/Axios";
import { WhyShopWithUsStoreFrontUI } from "./_components/WhyShopWithUsStore";
import { OurCustomerStoreFront } from "./_components/OurCustomerStoreFront";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function StorePage({ storeId }: any) {
  const router = useRouter();

  const featuredRef = useRef<HTMLDivElement>(null);

  const getAllProductsData = useQuery({
    queryKey: ["get-product"],
    queryFn: async () => {
      const endpoint = `product?id=${storeId}`;
      return await GET(endpoint);
    },
    enabled: !!storeId,
  });

  const featuredProducts = getAllProductsData?.data?.data?.products;

  const { currentTheme } = useTheme();

  const getSaleProductInfo = useQuery({
    queryKey: ["sale-product"],
    queryFn: async () => {
      const endpoint = `sale-product?id=${storeId}`;
      return await GET(endpoint);
    },
    enabled: !!storeId,
  });

  const saleData = getSaleProductInfo?.data?.data;

  const getBannerInfoData = useQuery({
    queryKey: ["banner-info"],
    queryFn: async () => {
      const endpoint = `customise-store-banner?id=${storeId}`;
      return await GET(endpoint);
    },
    enabled: !!storeId,
  });

  const bannerData = getBannerInfoData?.data?.data;

  // store info from BE..

  const getStoreInfo = useQuery({
    queryKey: ["store-info"],
    queryFn: async () => {
      const endpoint = `store/user/${storeId}`;
      return await GET(endpoint);
    },
    enabled: !!storeId,
  });

  const storeInfoFromBE = getStoreInfo?.data?.data;

  const storeName = storeInfoFromBE?.name;

  const getStoreThemeInfo = useQuery({
    queryKey: ["store-theme-data"],
    queryFn: async () => {
      const endpoint = `store-theme/${storeId}`;
      return await GET(endpoint);
    },
    enabled: !!storeId,
  });

  const themeData = getStoreThemeInfo?.data?.data;
  useEffect(() => {
    if (themeData) {
      const formattedTheme = {
        id: themeData.themeId,
        name: themeData.name,
        primary: themeData.primary,
        secondary: themeData.secondary,
        background: themeData.background,
        text: themeData.text,
        accent: themeData.accent,
      };

      const existingTheme = localStorage.getItem("theme");
      const existingParsed = existingTheme ? JSON.parse(existingTheme) : null;

      const isSameTheme =
        JSON.stringify(existingParsed) === JSON.stringify(formattedTheme);

      if (!isSameTheme) {
        localStorage.setItem("theme", JSON.stringify(formattedTheme));
      }
    }
  }, [themeData]);

  // const handleButtonClick = () => {
  //   if (featuredProducts && featuredProducts.length > 0) {
  //     router.push(`/store/${storeInfoFromBE?.id}/products`);
  //   }
  // };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1 },
    visible: {
      scale: 1,
      transition: {
        duration: 5,
        ease: "easeOut",
      },
    },
  };

  const handleButtonClick = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <StoreLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />

        {/* Animated background image */}
        <motion.div
          className="relative h-[500px] w-full"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <Image
            src={
              bannerData?.imageUrl || "/placeholder.svg?height=500&width=1200"
            }
            alt="Store banner"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </motion.div>

        {/* Content with staggered animations */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div className="max-w-xl" variants={containerVariants}>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                variants={itemVariants}
              >
                {bannerData?.title || "Welcome to Our Store"}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-lg"
                variants={itemVariants}
              >
                {bannerData?.description ||
                  "Discover premium products that elevate your everyday life. Quality and style combined for your satisfaction."}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <Button
                  size="lg"
                  onClick={handleButtonClick}
                  disabled={featuredProducts && featuredProducts?.length === 0}
                  style={{ backgroundColor: currentTheme.primary }}
                  className="hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                  // whileHover={{ scale: 1.05 }}
                  // whileTap={{ scale: 0.98 }}
                >
                  {bannerData?.buttonText || "Shop Now"}
                </Button>

                {/* Optional secondary button */}
                {/* {featuredProducts?.length > 0 && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white/10 hover:text-white"
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.98 }}
                  >
                    View Collections
                  </Button>
                )} */}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent z-20" />
      </section>

      {/* Featured Products */}
      <section
        ref={featuredRef}
        className="py-16 bg-opacity-5 mt-3"
        style={{ backgroundColor: currentTheme.secondary }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                Explore top picks from our store
              </p>
            </div>

            {/* <Link
              href={`/store/${storeName}/products`}
              className="mt-4 md:mt-0 flex items-center text-sm font-medium hover:underline"
              style={{ color: currentTheme.primary }}
            >
              View All Products <ArrowRight className="ml-1 h-4 w-4" />
            </Link> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts && featuredProducts?.length
              ? featuredProducts.map((product: any) => {
                  if (product.status === 1) {
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        storeInfoFromBE={storeInfoFromBE}
                      />
                    );
                  }
                })
              : null}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      {saleData?.campaigns?.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
              <div className="relative h-[300px] w-full">
                <Image
                  src={
                    saleData?.campaigns[0]?.bannerImageUrl ||
                    "/placeholder.svg?height=300&width=1200"
                  }
                  alt="Promotional banner"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="w-full max-w-xl mx-auto px-4 md:ml-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {saleData?.campaigns[0]?.title || "Sale Section"}
                  </h2>
                  <p className="text-lg text-white/90 mb-6">
                    {saleData?.campaigns[0]?.description || ""}
                  </p>
                  <Link href={`/store/${storeInfoFromBE?.id}/products/sale`}>
                    <Button
                      size="lg"
                      className="backdrop-blur-sm bg-[var(--accent-color)/70] hover:bg-[var(--accent-color)] text-white font-semibold px-6 py-3 rounded-xl shadow-lg border border-white/20 transition duration-200 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      View the Sale
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <WhyShopWithUsStoreFrontUI />

      {/* Testimonials */}
      <OurCustomerStoreFront />
      {/* Newsletter */}
      {/* <SubscribeToNewLetter /> */}
    </StoreLayout>
  );
}
