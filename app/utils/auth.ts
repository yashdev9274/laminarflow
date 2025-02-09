import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"
 

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Nodemailer({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
  ],
})