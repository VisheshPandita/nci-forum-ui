"use client";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createDiscussionAction } from "@/lib/actions";
import { discussionFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page({
  params,
}: {
  readonly params: { topicName: string };
}) {
  const discussionForm = useForm<z.infer<typeof discussionFormSchema>>({
    resolver: zodResolver(discussionFormSchema),
    defaultValues: {
      title: "",
      content: "",
      topicName: params.topicName,
    },
  });
  const onSubmit = async (data: z.infer<typeof discussionFormSchema>) => {
    try {
      await createDiscussionAction(data);
    } catch (error) {
      console.error("Failed to create discussion");
    }
  };
  return (
    <div className="flex min-h-[85dvh] min-w-max">
      <Card className="m-auto min-w-[50%]">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">New Discussion</CardTitle>
          <CardDescription>
            Create a new discussion in {params.topicName}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...discussionForm}>
            <form
              onSubmit={discussionForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={discussionForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={discussionForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={discussionForm.control}
                name="topicName"
                render={({ field }) => <Input type="hidden" {...field} />}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
