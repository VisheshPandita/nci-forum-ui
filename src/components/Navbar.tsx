import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const session = await getSession();

  return (
    <nav className="flex flex-row items-center h-14 px-4 border-b border-gray-200 dark:border-gray-800">
      {session ? (
        <>
          <Link className="mr-4 font-bold" href="/home">
            NCI Forum
            <span className="sr-only">NCI Forum</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="link" asChild>
              <Link href="/home">Home</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/home/topic">Topics</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href={`/home/profile/${session.data.user.username}`}>
                Profile
              </Link>
            </Button>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/");
              }}
            >
              <Button variant="outline" type="submit">
                Logout
              </Button>
            </form>
          </div>
        </>
      ) : (
        <>
          <Link className="mr-4 font-bold" href="/">
            NCI Forum
            <span className="sr-only">NCI Forum</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/register">Register</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </>
      )}
    </nav>
  );
}
