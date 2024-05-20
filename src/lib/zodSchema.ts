import { z } from "zod";

export const registerFormSchema = z
  .object({
    firstname: z.string().min(2).max(255),
    lastname: z.string().min(2).max(255),
    username: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const editProfileFormSchema = z.object({
  firstname: z.string().min(2).max(255),
  lastname: z.string().min(2).max(255),
  email: z.string().email(),
  username: z.string().min(2).max(255),
});

export const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(8).max(255),
    newPassword: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const loginFormSchema = z.object({
  username: z.string().min(2).max(255),
  password: z.string().min(8).max(255),
});

export const topicFormSchema = z.object({
  name: z.string().min(2).max(255).trim(),
  description: z.string().min(2).max(255),
});

export const discussionFormSchema = z.object({
  title: z.string().min(2).max(255),
  content: z.string().min(2).max(255),
  topicName: z.string().min(2).max(255),
});

export const commentFormSchema = z.object({
  content: z.string().min(2).max(255),
  discussionId: z.string().min(2).max(255),
});
