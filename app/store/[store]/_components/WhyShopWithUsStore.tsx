import { GET } from "@/app/utils/Axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const WhyShopWithUsStoreFrontUI = () => {
  let userId: string | null = null;
  try {
    const userData = typeof localStorage !== "undefined" ? localStorage.getItem("user") : null;
    const user = userData && JSON.parse(userData);
    userId = user?.id || null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["why-shop-with-us", userId],
    queryFn: async () => {
      const endpoint = `why-shop-with-us?id=${userId}`;
      return GET(endpoint);
    },
    enabled: !!userId,
  });

  const sectionData = data?.data?.[0];

  return (
    <section
      className="py-16 bg-opacity-5"
      style={{ backgroundColor: "var(--secondary-color)" }}
    >
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : sectionData ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{sectionData.sectionTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {sectionData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sectionData.features?.map(
                (
                  feature: { title: string; description: string },
                  index: number
                ) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                      }}
                    >
                      {/* Replace icon dynamically if needed */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground">
            No data available for this section.
          </div>
        )}
      </div>
    </section>
  );
};
