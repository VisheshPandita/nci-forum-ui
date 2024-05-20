import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function DiscussionMin({
  topicName,
  discussion,
}: {
  readonly topicName: any;
  readonly discussion: any;
}) {
  return (
    <Link href={`/home/topic/${topicName}/discussion/${discussion.id}`}>
      <Card className="p-3">
        <CardContent className="p-2 pb-0">
          <div>nci/{discussion.topic.name}</div>
        </CardContent>
        <CardHeader className="p-2 pt-0">
          <CardTitle>{discussion.title}</CardTitle>
        </CardHeader>

        <CardContent className="p-2">
          <CardDescription>{discussion.content}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
