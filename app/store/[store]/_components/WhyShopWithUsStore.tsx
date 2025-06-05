"use client";
import React from "react";
import { GET } from "@/app/utils/Axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
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
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const titleAnimation = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const descriptionAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
};

export const WhyShopWithUsStoreFrontUI = () => {
  const getParams = useParams();
  const storeId = getParams.store;

  const { data, isLoading } = useQuery({
    queryKey: ["why-shop-with-us", storeId],
    queryFn: async () => {
      const endpoint = `why-shop-with-us?id=${storeId}`;
      return GET(endpoint);
    },
    enabled: !!storeId,
  });

  const sectionData = data?.data?.[0];

  const showSection = sectionData && sectionData?.showOnUI;

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-16 flex justify-center items-center"
        style={{ backgroundColor: "var(--secondary-color)" }}
      >
        <div className="container mx-auto px-4 text-center">
          <p>Loading...</p>
        </div>
      </motion.div>
    );
  }

  if (!sectionData) {
    return null;
  }

  if (!showSection) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 bg-opacity-5"
      style={{ backgroundColor: "var(--secondary-color)" }}
    >
      <div className="container mx-auto px-4">
        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-center">Loading...</p>
          </motion.div>
        ) : sectionData ? (
          <>
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
              >
                {sectionData.sectionTitle} hello
              </motion.h2>
              <motion.p
                variants={descriptionAnimation}
                className="text-muted-foreground max-w-2xl mx-auto"
              >
                {sectionData.description}
              </motion.p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {sectionData.features?.map(
                (
                  feature: { title: string; description: string },
                  index: number
                ) => (
                  <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white bg-opacity-10 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#2563EB",
                        color: "white",
                      }}
                    >
                      <CheckCircle
                        className="w-6 h-6 text-white"
                        strokeWidth={2}
                      />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-2 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-center">
                      {feature.description}
                    </p>
                  </motion.div>
                )
              )}
            </motion.div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-center text-muted-foreground">
              Go to the Dashboard and customise the Store
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
