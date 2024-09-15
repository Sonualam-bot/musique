import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import db from "@/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }
      try {
        await db.user.create({
          data: {
            email: params.user.email,
            provider: "Google",
          },
        });
      } catch (error) {}
      return true;
    },
  },
});

export { handler as GET, handler as POST };
