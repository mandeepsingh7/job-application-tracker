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
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient, signIn } from "@/lib/auth/auth-client";
import { SubmitEvent } from "react";
import { toast } from "sonner";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="flex min-h-[calc(100vh-62px)] items-start justify-center mt-20">
        <Card className="w-full max-w-xs sm:max-w-sm">
          <CardHeader>
            <CardTitle>Invalid Reset Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Link href="/forgot-password" className="w-full">
              <Button className="w-full">
                Request New Link
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    setError(""); // Resetting the errors that might have happened in previous attempts
    setLoading(true);

    if(!token) {
      setError('Invalid or expired reset link.');
      setLoading(false);
      return;
    }

    if (password != confirmPassword) {
      setError('Passwords do no match');
      setLoading(false);
      return ;
    }



    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token
      })

      if (result.error) {
        setError(result.error.message ?? "An Error Occured while resetting password");
      } else {
        toast.success('Password reset successfully.');
        router.push('/sign-in');
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
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your new password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-2 mb-5">
            {error && (
              <div className="rounded-md bg-destructive/20 p-2 text-sm text-red-700 mb-4">
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="password" className="mb-1 px-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                minLength={8}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-sm placeholder:text-chart-1/50"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="mb-1 px-2">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-sm placeholder:text-chart-1/50"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-between p-7">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Resetting password..." : "Reset Password"}
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

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
