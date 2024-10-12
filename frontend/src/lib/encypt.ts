"use server";
import { JwtPayload } from "jsonwebtoken";
import { SignJWT } from "jose";

export async function encrypt(
  payload: JwtPayload,
  type: "session" | "refresh"
) {
  try {
    const expires: string = type === "session" ? "24h" : "7d";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expires)
      .sign(secret);
  } catch (error) {
    console.error("Error encrypting JWT:", error);
    throw error;
  }
}
