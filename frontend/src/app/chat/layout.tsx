"use server";
import Sidebar from "@/components/elements/Sidebar";
import { decrypt } from "@/lib/decrypt";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = cookies().get("session") as RequestCookie | undefined;
  const userData = await decrypt(session?.value as string);

  if (!userData) {
    redirect("/login");
  }

  return (
    <>
      <aside className="z-50 mt-10">
        <Sidebar />
      </aside>
      <main className="md:px-0 px-2">{children}</main>
    </>
  );
}
