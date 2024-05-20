import DiscussionMin from "@/components/DiscussionMin";
import { Button } from "@/components/ui/button";
import { deleteTopicAction } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export async function fetchTopicByName(topicName: string) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/topics/${topicName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        next: {
          tags: ["topicByName"],
        },
      }
    );

    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }

    if (response.status === 404) {
      console.error("Not Found");
      return {};
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch topic");
  }
}

export default async function Component({
  params,
}: {
  readonly params: { topicName: string };
}) {
  const { topic, discussions } = await fetchTopicByName(params.topicName);
  const session = await getSession();
  let isModerator = false;
  if (
    topic.moderators.find(
      (user: any) => user.username == session.data.user.username
    ) ||
    session.data.role === "admin"
  ) {
    isModerator = true;
  }
  return (
    <>
      <div className="flex justify-center p-3 text-4xl">nci/{topic.name}</div>
      <div className="flex justify-center p-2">
        <Button className="mr-2" variant={"outline"} asChild>
          <Link href={`/home/topic/${params.topicName}/discussion/new`}>
            Create new discussion
          </Link>
        </Button>
        {isModerator ? (
          <>
            <Button className="mr-2" variant={"outline"} asChild>
              <Link href={`/home/topic/${params.topicName}/edit`}>Edit</Link>
            </Button>
            <form action={deleteTopicAction}>
              <input type="hidden" name="name" value={params.topicName} />
              <Button
                type="submit"
                className="text-red-500 border-red-500"
                variant={"outline"}
              >
                Delete
              </Button>
            </form>
          </>
        ) : null}
      </div>

      <div className="flex justify-center p-2">{topic.description}</div>
      <div className="p-4">
        {discussions.map((discussion: any) => (
          <div key={discussion.id} className="py-3">
            <DiscussionMin
              topicName={params.topicName}
              discussion={discussion}
            />
          </div>
        ))}
      </div>
    </>
  );
}
