import { sampleBooks } from "@/app/constants";
import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button className="">Logout</Button>
      </form>
      <BookList title="Borroewd Books" books={sampleBooks} />
    </>
  );
};

export default Page;
