import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_MONGO_URI);
const db = client.db("better-authDB2");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset Your Password",
        html: `<p>Click the link to reset your password: ${url}</p>`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify Your Email",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - Quizcoin</title>
</head>
<body style="margin:0; padding:0; background-color:#0b0b0f; font-family:Arial,Helvetica,sans-serif; color:#ffffff;">

  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    Verify your email address to activate your Quizcoin account and get started.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0b0b0f; padding:40px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:520px; background-color:#11111a; border:1px solid #262633; border-radius:16px; overflow:hidden;">

          <tr>
            <td align="center" style="padding:32px 24px 24px;">
              <h1 style="margin:0; font-size:32px; font-weight:800; letter-spacing:-1px; color:#c2f800;">
                Quizcoin<span style="color:#ffffff;">.</span>
              </h1>
              <p style="margin:8px 0 0; color:#a1a1aa; font-size:13px; letter-spacing:2px; text-transform:uppercase;">
                Learn · Play · Earn
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px;">
              <div style="height:1px; background-color:#292936;"></div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:32px 28px 12px;">
              <div style="width:68px; height:68px; line-height:68px; border-radius:50%; background-color:#202a0b; color:#c2f800; font-size:34px; text-align:center;">
                &#9993;
              </div>

              <h2 style="margin:24px 0 12px; font-size:25px; line-height:1.4; color:#ffffff;">
                Verify Your Email Address
              </h2>

              <p style="margin:0; font-size:15px; line-height:1.8; color:#b4b4c0;">
                Welcome to Quizcoin! We're excited to have you here. Please verify your email address to confirm your account and get started.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:28px 28px 20px;">
              <a href="${url}" style="display:inline-block; background-color:#c2f800; color:#0b0b0f; text-decoration:none; font-size:16px; font-weight:700; padding:15px 36px; border-radius:8px;">
                Verify My Email
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 28px;">
              <p style="margin:0; text-align:center; font-size:13px; line-height:1.8; color:#a1a1aa;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>

              <p style="margin:12px 0 0; text-align:center; font-size:12px; line-height:1.8; word-break:break-all;">
                <a href="${url}" style="color:#c2f800; text-decoration:underline;">${url}</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 28px; background-color:#0e0e15; border-top:1px solid #262633;">
              <p style="margin:0 0 10px; text-align:center; font-size:13px; line-height:1.7; color:#a1a1aa;">
                If you didn't create a Quizcoin account, you can safely ignore this email.
              </p>

              <p style="margin:0; text-align:center; font-size:12px; color:#71717a;">
                &copy; 2026 Quizcoin. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 24 * 3600, // 1 hour
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
