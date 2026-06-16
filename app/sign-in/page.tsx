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
import { signIn } from "@/lib/auth/auth-client";
import { SubmitEvent } from "react";

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    setError(""); // Resetting the errors that might have happened in previous attempts
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "An Error Occured while logging in.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("An error occured.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex min-h-[calc(100vh-62px)] items-start justify-center" style={{ marginTop: "10vh" }}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
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
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-between p-7">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
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
