"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schemas";
import { compare, hash } from "bcryptjs";
import { eq, or } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  // eslint-disable-next-line no-undef
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip=(await headers()).get('x-fowarded-for') || "127.0.0.1";
  const {success} = await ratelimit.limit(ip);

  if(!success) return redirect('/too-fast');
  
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) return { success: false, error: result.error };

    return { success: true };
  } catch (error) {
    console.log(error, "SignUp error");
    return {
      error: "SignUp error",
      success: false,
    };
  }
};

// eslint-disable-next-line no-undef
export const signUp = async (params: AuthCredentials) => {
  const { email, fullName, password, universityCard, universityId } = params;

  const ip=(await headers()).get('x-fowarded-for') || "127.0.0.1";
  const {success} = await ratelimit.limit(ip);

  if(!success) return redirect('/too-fast');

  const user = await db
    .select()
    .from(users)
    .where(or(eq(users.universityId, universityId), eq(users.email, email)));

  if (user.length>0) return { success: false, error: "User already exist." };

  const hashedPasswrd = await hash(password, 10);

  try {
    await db.insert(users).values({
      email,
      fullName,
      password: hashedPasswrd,
      universityCard,
      universityId,
      status: "PENDING",
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "SignUp error");
    return {
      error: "SignUp error",
      success: false,
    };
  }
}; 