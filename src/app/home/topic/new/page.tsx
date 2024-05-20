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
import { createTopicAction } from "@/lib/actions";
import { topicFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const topicForm = useForm<z.infer<typeof topicFormSchema>>({
    resolver: zodResolver(topicFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof topicFormSchema>) => {
    try {
      await createTopicAction(data);
    } catch (error) {
      console.error("Failed to create topic");
    }
  };
  return (
    <div className="flex min-h-[85dvh] min-w-max">
      <Card className="m-auto">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">New Topic</CardTitle>
          <CardDescription>
            Create a new topic by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...topicForm}>
            <form
              onSubmit={topicForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={topicForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
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
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
