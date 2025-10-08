import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs"; // Changed from bcrypt to bcryptjs

// In a real application, you would use a database adapter
// This is a simple in-memory user store for demonstration
const users = new Map();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "", // Comment out for development
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", // Comment out for development
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = users.get(credentials.email);
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signUp: "/register",
    error: "/login",
    verifyRequest: "/verify-request",
    newUser: "/dashboard",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-development-secret-key", // Use environment variable in production
};

// API routes for user management
export async function registerUser(userData: {
  name: any;
  email: any;
  password: any;
}) {
  const { email, password, name } = userData;

  if (users.has(email)) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 10);
  const id = Date.now().toString();

  users.set(email, {
    id,
    email,
    name,
    password: hashedPassword,
  });

  return { id, email, name };
}

export async function requestPasswordReset(email: any) {
  if (!users.has(email)) {
    // For security reasons, don't reveal if the user exists
    return true;
  }

  // In a real application, generate a token and send an email
  const resetToken = Math.random().toString(36).substring(2, 15);
  const user = users.get(email);
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour

  return true;
}

export async function resetPassword(email: any, token: any, newPassword: any) {
  if (!users.has(email)) {
    throw new Error("User not found");
  }

  const user = users.get(email);

  if (!user.resetToken || user.resetToken !== token) {
    throw new Error("Invalid reset token");
  }

  if (!user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
    throw new Error("Reset token expired");
  }

  const hashedPassword = await hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;

  return true;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
