import { getSession } from "@/lib/auth";
import { fetchTopicByName } from "../page";
import { redirect } from "next/navigation";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import TopicEditForm from "@/components/TopicEditForm";

export default async function Component({
  params,
}: {
  readonly params: { topicName: string };
}) {
  const { topic } = await fetchTopicByName(params.topicName);
  const session = await getSession();
  if (
    !topic.moderators.find(
      (user: any) => user.username == session.data.user.username
    ) ||
    session.data.role == !"admin"
  ) {
    redirect(`/home/topic/${params.topicName}`);
  }

  return (
    <div className="flex min-h-[85dvh] min-w-max">
      <Card className="m-auto">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Edit topic - nci/{params.topicName}
          </CardTitle>
          <CardDescription>
            Edit the topic by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TopicEditForm topic={topic} />
        </CardContent>
      </Card>
    </div>
  );
}
