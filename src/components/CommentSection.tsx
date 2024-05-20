import { getSession } from "@/lib/auth";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

async function fetchComments(discussionId: string) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/comments/${discussionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        next: {
          tags: ["comments"],
        },
      }
    );

    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }

    if (response.status === 404) {
      return {};
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch comments");
  }
}

export default async function CommentSection({
  discussionId,
}: {
  readonly discussionId: string;
}) {
  const commentData = await fetchComments(discussionId);
  return (
    <>
      <CommentForm discussionId={discussionId} />
      {commentData && commentData.length > 0
        ? commentData.map((comment: any) => (
            <Comment key={comment.id} comment={comment} />
          ))
        : null}
    </>
  );
}
