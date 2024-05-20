import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import Link from "next/link";

async function fetchTopics() {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/topics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        next: {
          tags: ["topics"],
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
    console.error("Failed to fetch topics");
  }
}

export default async function Page() {
  const topics = await fetchTopics();
  return (
    <div className="flex flex-col min-h-[85dvh] py-3">
      <div className="flex flex-row justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl px-3">
          Topics
        </h1>
        <Button variant={"outline"} asChild>
          <Link href="/home/topic/new"> Create new topic</Link>
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-3 grid-rows-4 p-4">
        {topics && topics.length > 0
          ? topics.map((topic: any) => (
              <Link
                className=""
                href={`/home/topic/${topic.name}`}
                key={topic.id}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">
                      nci/{topic.name}
                    </CardTitle>
                    <CardDescription className="text-gray-700 text-base">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
}
