import Sidebar from "@/components/elements/Sidebar";
import React from "react";
export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside className="fixed">
        <Sidebar />
      </aside>
      <main className="md:px-0 px-2">{children}</main>
    </>
  );
}
