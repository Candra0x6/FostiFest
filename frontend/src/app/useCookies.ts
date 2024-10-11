"use server";
import { decrypt } from "@/lib/decrypt";
import { cookies } from "next/headers";
import React from "react";

export const useCookies = () => {
  const decryptSession = async () => {
    const session = cookies().get("session");
    if (session) {
      const payload = await decrypt(session.value);
      return payload;
    }
  };
  return {
    decryptSession,
  };
};
