import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-2">
            <Image src="/icons/logo.svg" height={37} width={37} alt="logo" />
            <h1 className="text-2xl font-semibold text-white">Bookive</h1>
          </div>

          <div className="">{children}</div>
        </div>
      </section>

      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          width={1000}
          height={1000}
          alt="auth illustration"
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default Layout;
