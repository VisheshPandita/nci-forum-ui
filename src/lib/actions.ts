"use server";

import { redirect } from "next/navigation";
import { getSession, login, register } from "./auth";
import { revalidateTag } from "next/cache";
import {
  changePasswordFormSchema,
  commentFormSchema,
  discussionFormSchema,
  editProfileFormSchema,
  loginFormSchema,
  registerFormSchema,
  topicFormSchema,
} from "./zodSchema";
import { z } from "zod";
import { cookies } from "next/headers";

export async function loginAction(formData: z.infer<typeof loginFormSchema>) {
  await login(formData);
  redirect("/home");
}

export async function registerAction(
  formData: z.infer<typeof registerFormSchema>
) {
  await register(formData);
  redirect("/home");
}

export async function createTopicAction(
  formData: z.infer<typeof topicFormSchema>
) {
  const session = await getSession();
  const topicReqData = {
    name: formData["name"],
    description: formData["description"],
    creatorUsername: session.data.user.username,
  };
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/topics`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(topicReqData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.error("Failed to create topic");
  }
  revalidateTag("topics");
  redirect("/home/topic");
}

export async function EditTopicAction(
  formData: z.infer<typeof topicFormSchema>
) {
  const session = await getSession();
  const topicReqData = {
    name: formData["name"],
    description: formData["description"],
    creatorUsername: session.data.user.username,
  };
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/topics/${formData["name"]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(topicReqData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.error("Failed to create topic");
  }
  revalidateTag("topics");
  redirect(`/home/topic/${formData["name"]}`);
}

export async function deleteTopicAction(formData: FormData) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/topics/${formData.get("name")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.error("Failed to create topic");
  }
  revalidateTag("topics");
  redirect(`/home/topic`);
}

export async function createDiscussionAction(
  formData: z.infer<typeof discussionFormSchema>
) {
  const session = await getSession();
  const discussionReqData = {
    title: formData["title"],
    content: formData["content"],
    topicName: formData["topicName"],
    authorUsername: session.data.user.username,
  };
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/discussions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(discussionReqData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.error("Failed to create discussion");
  }
  revalidateTag("discussions");
  redirect(`/home/topic/${formData["topicName"]}`);
}

export async function deleteDiscussionAction(formData: FormData) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/discussions/${formData.get(
        "discussionId"
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.error("Failed to delete discussion");
  }
  revalidateTag("discussions");
  redirect(`/home/topic/${formData.get("topicName")}`);
}

export async function createCommentAction(
  formData: z.infer<typeof commentFormSchema>
) {
  const session = await getSession();
  const commentReqData = {
    content: formData["content"],
    authorUsername: session.data.user.username,
  };
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/comments/${formData["discussionId"]}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(commentReqData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.error("Failed to create comment");
  }
  revalidateTag("comments");
}

export async function deleteCommentAction(formData: FormData) {
  const session = await getSession();
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/comments/${formData.get(
        "commentId"
      )}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.error("Failed to delete comment");
  }
  revalidateTag("comments");
}

export async function deleteProfileAction() {
  const session = await getSession();
  console.log(session.data.user.username);
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/users/${session.data.user.username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }

    cookies().set("session", "", { expires: new Date(0) });
  } catch (error) {
    console.error("Failed to delete profile");
  }
  revalidateTag("profile");
  redirect("/register");
}

export async function editProfileAction(
  formData: z.infer<typeof editProfileFormSchema>
) {
  const session = await getSession();
  const profileReqData = {
    firstname: formData["firstname"],
    lastname: formData["lastname"],
    username: formData["username"],
    email: formData["email"],
  };
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/users/${session.data.user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(profileReqData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.error("Failed to edit profile");
  }
  revalidateTag("profile");
  redirect(`/home/profile/${formData["username"]}`);
}

export async function changePasswordAction(
  formData: z.infer<typeof changePasswordFormSchema>
) {
  const session = await getSession();
  const passwordReqData = {
    currentPassword: formData["oldPassword"],
    newPassword: formData["newPassword"],
    confirmationPassword: formData["confirmPassword"],
  };
  try {
    const response = await fetch(
      `${process.env.NCI_FORUM_API_URL}/api/v1/users/${session.data.user.username}/update-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.access_token}`,
        },
        body: JSON.stringify(passwordReqData),
      }
    );
    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized");
      return {};
    }
    if (response.status === 404) {
      console.error("404");
      return {};
    }
  } catch (error) {
    console.error("Failed to edit profile");
  }
  revalidateTag("profile");
  redirect(`/home/profile/${session.data.user.username}`);
}
