"use server";
import { cookies } from "next/headers";

export const newSession = (a: string) => {
  cookies().set("session", a);
};
