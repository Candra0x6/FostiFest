"use server";
import { JwtPayload } from "jsonwebtoken";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function encrypt(
  payload: JwtPayload,
  type: "session" | "refresh"
) {
  try {
    const expires: string = type === "session" ? "24h" : "7d";
    const secret = new TextEncoder().encode("123456789");
    const session = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expires)
      .sign(secret);
    cookies().set("session", session);
  } catch (error) {
    console.error("Error encrypting JWT:", error);
    throw error;
  }
}
