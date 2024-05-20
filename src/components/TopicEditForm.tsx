"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditTopicAction } from "@/lib/actions";
import { topicFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function TopicEditForm({ topic }: { readonly topic: any }) {
  const topicForm = useForm<z.infer<typeof topicFormSchema>>({
    resolver: zodResolver(topicFormSchema),
    defaultValues: {
      name: topic.name,
      description: topic.description,
    },
  });
  const onSubmit = async (data: z.infer<typeof topicFormSchema>) => {
    try {
      await EditTopicAction(data);
    } catch (error) {
      console.error("Failed to edit topic");
    }
  };
  return (
    <Form {...topicForm}>
      <form onSubmit={topicForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={topicForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={topicForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Edit</Button>
      </form>
    </Form>
  );
}
