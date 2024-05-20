"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCommentAction } from "@/lib/actions";
import { commentFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CommentForm({
  discussionId,
}: {
  readonly discussionId: string;
}) {
  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
      discussionId: discussionId,
    },
  });
  const onSubmit = async (data: z.infer<typeof commentFormSchema>) => {
    try {
      await createCommentAction(data);
    } catch (error) {
      console.error("Failed to create comment");
    }
  };
  return (
    <div className="">
      <Form {...commentForm}>
        <form
          onSubmit={commentForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="flex flex-row">
            <div className="min-w-[85%]">
              <FormField
                control={commentForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={commentForm.control}
              name="discussionId"
              render={({ field }) => <Input type="hidden" {...field} />}
            />
            <Button className="mx-auto" type="submit">
              Comment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
