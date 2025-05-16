"use client";
import { GET } from "@/app/utils/Axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const titleAnimation = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const OurCustomerStoreFront = () => {
  const getParams = useParams();
  const storeId = getParams.store;
  const { data, isLoading } = useQuery({
    queryKey: ["our-customer-section", storeId],
    queryFn: async () => {
      const endpoint = `our-customer-section/${storeId}`;
      return GET(endpoint);
    },
    enabled: !!storeId,
  });

  const testimonials = data?.data;

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-16 flex justify-center items-center"
      >
        <div className="container mx-auto px-4 text-center">
          <p>Loading testimonials...</p>
        </div>
      </motion.div>
    );
  }

  if (!testimonials || testimonials?.length === 0) {
    return null;
  }

  // Ensure we only show 3 testimonials per row
  const chunkedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    chunkedTestimonials.push(testimonials.slice(i, i + 3));
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
          >
            {testimonials?.heading || "What Our Customers Say"}
          </motion.h2>
          {testimonials?.subHeading && (
            <motion.p
              variants={titleAnimation}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              {testimonials.subHeading}
            </motion.p>
          )}
        </motion.div>

        {chunkedTestimonials.map((row, rowIndex) => (
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
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 mr-1"
                      fill={
                        i < testimonial.rating ? "var(--accent-color)" : "none"
                      }
                      style={{
                        color:
                          i < testimonial.rating
                            ? "var(--accent-color)"
                            : "#d1d5db",
                      }}
                    />
                  ))}
                </div>
                <p className="mb-6 text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-white dark:border-gray-700 shadow">
                    <Image
                      src={testimonial.imageUrl || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.status}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
