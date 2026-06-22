import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { headers } from "next/headers";
import { initializeUserBoard } from "../init-user-board";
import { initializeUserProfile } from "../init-user-profile";
import connectDB from "../db";
import { Resend } from 'resend';
import VerifyEmail from "@/emails/verify-email";
import ForgotPasswordEmail from "@/emails/reset-password";

const mongooseInstance = await connectDB();
const client = mongooseInstance.connection.getClient();
const db = client.db();
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    baseURL: process.env.BETTER_AUTH_URL,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ( { user, url }) => {
            await resend.emails.send({
                from: 'Job Application Tracker <noreply@mandeeps.in>',
                to: user.email,
                subject: "Reset your password",
                react: ForgotPasswordEmail({
                    userName: user.name,
                    resetUrl: url
                })
            });
        },
    },
    emailVerification: {
        sendVerificationEmail: async ( { user, url }) => {
            await resend.emails.send({
                from: 'Job Application Tracker <noreply@mandeeps.in>',
                to: user.email,
                subject: "Verify your email address",
                react: VerifyEmail({
                    userName: user.name,
                    verificationUrl: url
                })
            });
        },
        sendOnSignUp: true,
    },
    session:{
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 // Cache duration in seconds
        }
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    if (user.id) {
                        await initializeUserBoard(user.id);
                        await initializeUserProfile(user.id);
                    }
                }
            }
        }
    }
});

export async function getSession() {
    const result = await auth.api.getSession({
        headers: await headers()
    });

    return result;
}