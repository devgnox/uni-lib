import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import Image from "next/image";
import { sampleBooks } from "../constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schemas";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Home = async () => {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
