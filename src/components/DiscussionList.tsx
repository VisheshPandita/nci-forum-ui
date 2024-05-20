import { getSession } from "@/lib/auth";
import DiscussionMin from "./DiscussionMin";

async function fetchDiscussions() {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/discussions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        next: {
          tags: ["discussions"],
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch discussions");
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
    console.error("Failed to fetch discussions");
  }
}

export default async function DiscussionList() {
  const discussions = await fetchDiscussions();
  return (
    <div className="pr-4">
      {discussions && discussions.length > 0
        ? discussions.map((discussion: any) => (
            <div className="py-3" key={discussion.id}>
              <DiscussionMin
                topicName={discussion.topic.name}
                discussion={discussion}
              />
            </div>
          ))
        : null}
    </div>
  );
}
