import { jwtVerify } from "jose";
import { UserData } from "@/hooks/useSession";
interface DecryptData {
  exp : number
  iat : number
  user : UserData
}
export async function decrypt(input: string): Promise<DecryptData> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(input, secret, {
      algorithms: ["HS256"],
    });
    return payload as unknown as DecryptData;
  } catch (error) {
    console.error("Error decrypting JWT:", error);
    throw error;
  }
}
