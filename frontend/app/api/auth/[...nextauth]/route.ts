import { addUsers } from "@ext/lib/usefulFunctions";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

async function refreshAccessToken(token: JWT) {
  try {
    const body = new URLSearchParams();
    body.append("client_id", process.env.GOOGLE_CLIENT_ID!);
    body.append("client_secret", process.env.GOOGLE_CLIENT_SECRET!);
    body.append("grant_type", "refresh_token");
    body.append("refresh_token", token.refreshToken as string);

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      cache: "no-store",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: GOOGLE_AUTHORIZATION_URL as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider == "google") {
        const response = await addUsers(user);
        const data = await response.json();
        user.id = data.message._id;
        return true;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account as any).expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < (token as any)?.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken as string,
        idUser: (token?.user as any)?.id as string,
        name: (token?.user as any)?.name as string,
        email: (token?.user as any)?.email as string,
        image: (token?.user as any)?.image as string,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
