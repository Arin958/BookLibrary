import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import Header from "@/components/Header";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import Image from "next/image";

export default async function Home() {
  const result = await db.select().from(users)


  return (
    <>
      <BookOverview {...sampleBooks[0]} isLoanedBook={false}/>
      <BookList title="Latest Books" books={sampleBooks} containerClassName="mt-10"/>

    </> 
  );
}
