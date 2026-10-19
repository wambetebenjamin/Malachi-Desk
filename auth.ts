import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

providers.push(
  Credentials({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      name: { label: "Name", type: "text" },
    },
    authorize: async (credentials) => {
      const email = String(credentials?.email || "").toLowerCase().trim();
      const password = String(credentials?.password || "");
      const name = String(credentials?.name || "").trim();
      // Demo account for evaluating the dashboard without external services.
      if (email === "demo@malachidesk.co.ke" && password === "demo1234") {
        return { id: "demo-owner", name: "Wanjiru", email };
      }
      // Sign up flow: any new account with a valid password can enter the demo dashboard.
      // Replace with a real user database before production launch.
      if (name && email.includes("@") && password.length >= 8) {
        return { id: `user-${Buffer.from(email).toString("hex").slice(0, 12)}`, name, email };
      }
      return null;
    },
  })
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers,
  pages: { signIn: "/auth/signin" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "malachi-desk-dev-secret-change-in-production",
});
