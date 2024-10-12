"use server";

import { encrypt } from "@/lib/encypt";

export async function register(formData: {
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.status === 201) {
      const encryptedSession = await encrypt(data, "session");
      const cookies = require("next/headers").cookies;
      cookies().set("session", encryptedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      return { success: true, message: "Registrasi berhasil!, Silahkan Login" };
    }

    return { success: false, message: "Registrasi gagal" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Terjadi kesalahan" };
  }
}

export async function login(formData: { username: string; password: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      const encryptedSession = await encrypt(data, "session");
      const cookies = require("next/headers").cookies;
      cookies().set("session", encryptedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      return { success: true, message: "Login berhasil!" };
    }

    return {
      success: false,
      message: "Login gagal Periksa Password atau Username Anda",
    };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Terjadi kesalahan dari Server" };
  }
}
