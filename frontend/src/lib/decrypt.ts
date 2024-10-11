import { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "jose";
export async function decrypt(input: string): Promise<JwtPayload> {
  try {
    const secret = new TextEncoder().encode("123456789");
    const { payload } = await jwtVerify(input, secret, {
      algorithms: ["HS256"],
    });
    return payload as JwtPayload;
  } catch (error) {
    console.error("Error decrypting JWT:", error);
    throw error;
  }
}
