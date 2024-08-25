import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // connect to database
      await connectDB();
      // check if user exists
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        //Truncate user name if too long
        const username = profile.name.slice(0, 20);
        // create user in database
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // return true to sign in user
      return true;
    },
    async session({ session }) {
      // 1. GET User from database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign user to session
      session.user.id = user._id.toString();
      // 3. Return session
      return session;
    },
  },
};
