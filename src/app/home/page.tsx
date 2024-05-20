import DiscussionList from "@/components/DiscussionList";
import TopicList from "@/components/TopicList";
import { Separator } from "@/components/ui/separator";

export default function Component() {
  return (
    <div className="flex flex-row">
      <div className="w-1/4">
        <h2 className="scroll-m-20 p-2 text-3xl font-semibold tracking-tight first:mt-0">
          Topics
        </h2>
        <TopicList />
      </div>
      <Separator orientation="vertical" className="my-4 mx-4 min-h-dvh" />
      <div className="w-3/4 min-h-max">
        <h2 className="scroll-m-20 p-2 text-3xl font-semibold tracking-tight first:mt-0">
          Discussions
        </h2>
        <DiscussionList />
      </div>
    </div>
  );
}
