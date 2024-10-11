
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GoogleGenerativeAI } from '@google/generative-ai';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export { genAI, model };