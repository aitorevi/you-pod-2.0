import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthUrl: string = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "domain Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "a wonderfull name",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${nextAuthUrl}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    logo: "/next.svg", // Absolute URL to image
  },
});

export { handler as GET, handler as POST };
