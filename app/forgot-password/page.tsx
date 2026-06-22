"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, signIn } from "@/lib/auth/auth-client";
import { SubmitEvent } from "react";
import { FaGoogle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    setError(""); // Resetting the errors that might have happened in previous attempts
    setLoading(true);

    try {
      const result = await authClient.requestPasswordReset({
        email: email,
        redirectTo: '/reset-password'
      })

      if (result.error) {
        setError(result.error.message ?? "An Error Occured while resetting password");
      } else {
        toast.success('Succesfully sent password reset link. Please also check your spam folder.')
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex min-h-[calc(100vh-62px)] items-start justify-center" style={{ marginTop: "10vh" }}>
      <Card className="w-full max-w-xs sm:max-w-sm">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-2 mb-5">
            {error && (
              <div className="rounded-md bg-destructive/20 p-2 text-sm text-red-700 mb-4">
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="email" className="mb-1 px-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@yahoo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm placeholder:text-chart-1/50"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-between p-7">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending reset link..." : "Send Reset Password Link"}
            </Button>

            <p className="flex gap-3 items-center">Don't have an account?
                <Link href='/sign-up'>
                <Button variant='ghost'>Sign Up</Button></Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
