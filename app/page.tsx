import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/auth";
import Link from "next/link";
import { Suspense } from "react";

async function HomePage() {
  const session = await getSession();
  return (
    <div className="flex min-h-screen flex-col">
      <main>
        <section className="mx-auto px-4 py-32">
          <div className="mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-1 sm:mb-3 text-foreground">
              Job Application Tracker
            </h1>
            <p className="text-primary text-xl sm:text-2xl mb-5 sm:mb-10">
              Track your job applications
            </p>
            <div>
              <Link href={'/sign-up'}>
                <Button className="sm:text-xl sm:h-12 px-8 text-lg h-10">
                  {session?.user ?<>Go to Dashboard</> : <>Sign Up</>}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default async function Home() {
  return (
    <Suspense fallback = {
        <div className="flex justify-center items-center ">
            <p className="text-xl">Loading...</p>
        </div>
    }>
      <HomePage />
    </Suspense>
  );
}
