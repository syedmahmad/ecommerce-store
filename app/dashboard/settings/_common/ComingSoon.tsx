"use client";

import { motion } from "framer-motion";
import { Mail, Clock, Sparkles, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// Client-side only component for animated background elements
const AnimatedBackground = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      className="absolute top-0 left-0 w-full h-full overflow-hidden"
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: Math.random() * 1000 }}
          animate={{
            y: 1000,
            x: Math.random() * 1000 - 500,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-white opacity-50"
          style={{
            fontSize: `${10 + Math.random() * 20}px`,
          }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 6,
    minutes: 45,
  });

  useEffect(() => {
    // This will only run on client side
    const timer = setInterval(() => {
      // Update countdown logic here
      // For now we'll just use static values
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 mb-8 text-purple-200">
      <Clock className="animate-pulse" />
      <span>Launching in</span>
      <div className="flex gap-2">
        <div className="px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
          <span className="text-2xl font-bold text-white">{timeLeft.days}</span>{" "}
          days
        </div>
        <div className="px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
          <span className="text-2xl font-bold text-white">
            {timeLeft.hours}
          </span>{" "}
          hours
        </div>
        <div className="px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm">
          <span className="text-2xl font-bold text-white">
            {timeLeft.minutes}
          </span>{" "}
          mins
        </div>
      </div>
    </div>
  );
};

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  if (!isClient) {
    // Return a simplified version for SSR
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-6">
            Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mb-12">
            We're crafting something extraordinary for you. Stay tuned for the
            big reveal!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden relative">
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard/settings")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <AnimatedBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-pink-500 opacity-20"
            ></motion.div>
            <motion.div
              animate={{
                rotate: [0, -15, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.5,
              }}
              className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-indigo-500 opacity-20"
            ></motion.div>
            <h1 className="relative text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-6">
              Coming Soon
            </h1>
          </div>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-purple-100 max-w-2xl mb-12"
        >
          We're crafting something extraordinary for you. Stay tuned for the big
          reveal!
        </motion.p>

        <CountdownTimer />

        {!subscribed ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                <Input
                  type="email"
                  placeholder="Enter your email for updates"
                  className="pl-10 pr-4 py-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                Notify Me
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-6 py-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-purple-100"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="text-pink-300 animate-pulse" />
              <span>Thank you! We'll notify you when we launch.</span>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 flex gap-4"
        >
          {["Twitter", "Instagram", "LinkedIn"].map((social) => (
            <motion.a
              key={social}
              href="#"
              whileHover={{ y: -3 }}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-purple-100 hover:text-white transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
