import { GET } from "@/app/utils/Axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export const OurCustomerStoreFront = () => {
  const lcData = typeof window !== "undefined" && localStorage.getItem("user");
  const parseLCData = lcData && JSON.parse(lcData);
  const userId = parseLCData?.id;
  const { data } = useQuery({
    queryKey: ["our-customer-section", userId],
    queryFn: async () => {
      const endpoint = `our-customer-section/${userId}`;
      return GET(endpoint);
    },
    enabled: !!userId,
  });

  const testimonials = data?.data;

  return (
    <div>
      {testimonials && testimonials?.length > 0 ? (
        <>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  What Our Customers Say
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Don't just take our word for it. Here's what our customers
                  have to say about their shopping experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial: any) => (
                  <div
                    key={testimonial.id}
                    className="bg-opacity-5 p-6 rounded-lg"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 mr-1"
                          fill={
                            i < testimonial.rating
                              ? "var(--accent-color)"
                              : "none"
                          }
                          style={{ color: "var(--accent-color)" }}
                        />
                      ))}
                    </div>
                    <p className="mb-6 italic">{testimonial.testimonial}</p>
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.imageUrl || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};
