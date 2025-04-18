import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { CartProvider } from "@/context/cart-context"
import { ThemeProvider } from "@/context/theme-context"
import { AdminThemeProvider } from "@/context/admin-theme-context"
import { AuthProviderWrapper } from "@/components/auth-provider-wrapper"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "StoreBuilder - Create your online store in minutes",
  description: "No coding required. Upload products, set prices, and start selling today with your own custom store.",
    generator: 'v0.dev'
}



export default function RootLayout({ children }: any)  {
  return (
    <html lang="en">
      <body className={inter.className}>
      <GoogleOAuthProvider clientId="954964942815-aqcqr1ldm7hp4rs9qhq6pd1b8m5sb2q9.apps.googleusercontent.com">
        <AuthProviderWrapper>
          <ThemeProvider>
            <AdminThemeProvider>
              <CartProvider>
                {children}
                <Toaster />
              </CartProvider>
            </AdminThemeProvider>
          </ThemeProvider>
        </AuthProviderWrapper>
        </GoogleOAuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  )
}


import './globals.css'