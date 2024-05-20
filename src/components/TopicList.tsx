import { getSession } from "@/lib/auth";
import Link from "next/link";
import { Button } from "./ui/button";

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

    if (!response.ok) {
      console.error("Failed to fetch topics");
      return [];
    }

    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return [];
    }

    if (response.status === 404) {
      console.error("Not Found");
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch topics");
  }
}

export default async function TopicList() {
  const topics = await fetchTopics();

  return (
    <ul>
      {topics && topics.length > 0
        ? topics.map((topic: any) => (
            <li key={topic.id} className="py-2">
              <Button variant="link" asChild>
                <div className="flex flex-row space-x-2">
                  <Link href={`/home/topic/${topic.name}`}>
                    <b>nci/{topic.name}</b>
                  </Link>
                </div>
              </Button>
            </li>
          ))
        : null}
    </ul>
  );
}
