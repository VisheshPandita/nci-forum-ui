import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const secretKey = "secret_key";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
  return payload;
}

export async function register(formData: any) {
  const reqBody = {
    firstname: formData["firstname"],
    lastname: formData["lastname"],
    username: formData["username"],
    email: formData["email"],
    password: formData["password"],
    role: "USER",
  };
  const res = await fetch(
    `${process.env.NCI_FORUM_API_URL}/api/v1/auth/register`,
    {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ data, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function login(formData: any) {
  const reqBody = {
    username: formData["username"],
    password: formData["password"],
  };
  const res = await fetch(
    `${process.env.NCI_FORUM_API_URL}/api/v1/auth/authenticate`,
    {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.log(res.body);
  }
  const data = await res.json();

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ data, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return;
  }

  const parsed = await decrypt(session);
  const res = await fetch(
    `${process.env.NCI_FORUM_API_URL}/api/v1/auth/logout`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsed.data.access_token}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to logout");
  }

  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return undefined;
  }

  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return;
  }

  const parsed = await decrypt(session);
  const res = await fetch(
    `${process.env.NCI_FORUM_API_URL}/api/v1/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsed.data.refresh_token}`,
      },
    }
  );

  res.json().then(() => {
    parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  });

  const finalRes = NextResponse.next();
  finalRes.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    expires: parsed.expires,
    httpOnly: true,
  });

  return finalRes;
}
