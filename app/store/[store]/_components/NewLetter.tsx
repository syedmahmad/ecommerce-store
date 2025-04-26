import { Button } from "@/components/ui/button";
import React from "react";

export const SubscribeToNewLetter = () => {
  return (
    <section
      className="py-16 bg-opacity-10"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-6 opacity-80">
            Subscribe to our newsletter to receive updates on new products,
            special offers, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--primary-color)",
                color: "var(--text-color)",
              }}
            />
            <Button style={{ backgroundColor: "var(--primary-color)" }}>
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
