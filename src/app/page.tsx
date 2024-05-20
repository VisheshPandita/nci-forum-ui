import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session) {
    redirect("/home");
  }
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container flex flex-col items-center justify-center px-4 space-y-4 md:px-6 lg:space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Welcome to the club
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Be upto date with the latest happenings in the NCI community.
            </p>
          </div>
          <div className="mx-auto space-y-2 min-[400px]:flex md:space-x-4 md:space-y-0">
            <Button asChild variant="outline">
              <Link href="/register">Register</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Features
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              This platform is designed to keep you upto date with whats
              happening in the NCI community.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-4">
            <div className="grid gap-2">
              <div className="grid ">
                <p className="text-sm font-medium">
                  • Find topics that you like
                </p>
              </div>
              <div className="grid ">
                <p className="text-sm font-medium">
                  • Engage in discussion about different topics
                </p>
              </div>
              <div className="grid ">
                <p className="text-sm font-medium">• Share your opinions!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
