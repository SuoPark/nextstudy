import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "email-password-credential",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          id: credentials?.email || "",
          email: credentials?.email,
          password: credentials?.password,
        };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
});
