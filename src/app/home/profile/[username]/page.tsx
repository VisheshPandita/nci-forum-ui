import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { deleteProfileAction } from "@/lib/actions";
import Link from "next/link";

export async function fetchProfile(username: string) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/users/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        next: {
          tags: ["profile"],
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch profile");
  }
}

export default async function Component({
  params,
}: {
  readonly params: { username: string };
}) {
  const profile = await fetchProfile(params.username);
  const session = await getSession();
  let isOwner = false;
  if (session.data.user.username == params.username) {
    isOwner = true;
  }
  return (
    <div className="flex justify-center my-[30%]">
      <Card className="max-w-[50%]">
        <CardHeader>
          <CardTitle className="px-4">Username - {profile.username}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="px-4">
            Email - {profile.email}
          </CardDescription>
          <CardDescription className="px-4">
            Name - {profile.firstname} {profile.lastname}
          </CardDescription>
          {isOwner ? (
            <div className="flex flex-row">
              <Button variant={"link"} asChild>
                <Link href={`/home/profile/${session.data.user.username}/edit`}>
                  Edit
                </Link>
              </Button>
              <form action={deleteProfileAction}>
                <Button variant={"link"} className="text-red-500">
                  Delete
                </Button>
              </form>

              <Button variant={"link"} asChild>
                <Link
                  href={`/home/profile/${session.data.user.username}/change-password`}
                >
                  Change Password
                </Link>
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
