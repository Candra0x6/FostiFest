import { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "jose";
import { UserData } from "@/hooks/useSession";
export async function decrypt(input: string): Promise<UserData> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(input, secret, {
      algorithms: ["HS256"],
    });
    return payload as unknown as UserData;
  } catch (error) {
    console.error("Error decrypting JWT:", error);
    throw error;
  }
}
