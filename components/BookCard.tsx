import Link from "next/link"
import React from "react"
import BookCover from "./BookCover"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "./ui/button"

const BookCard = ({ id, title, genre, coverColor, coverUrl, isLoanedBook = false }: Book) => {
  return (
    <li
      className={cn(
        "group relative flex flex-col shadow-sm transition hover:shadow-xl hover:-translate-y-1",
        isLoanedBook ? "sm:w-60 w-full" : "sm:w-52 w-full"
      )}
    >
      <Link href={`/books/${id}`} className="flex flex-col items-center p-4">
        {/* Book Cover */}
        <div className="relative w-full flex justify-center">
          <BookCover coverColor={coverColor} coverImage={coverUrl} showSecondBook={false} />
        </div>

        {/* Book Info */}
        <div className={cn("mt-4 text-center", !isLoanedBook && "sm:max-w-40 max-w-28")}>
          <p className="font-semibold text-gray-400 text-base group-hover:text-primary transition">
            {title}
          </p>
          <p className="text-sm text-gray-500">{genre}</p>
        </div>

        {/* Loan Info (Optional) */}
        {isLoanedBook && (
          <div className="mt-4 w-full">
            <div className="flex items-center gap-2 rounded-lg bg-yellow-50 px-3 py-2 text-sm text-yellow-700 shadow-inner">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p>11 Days left to return</p>
            </div>

            <Button className="mt-3 w-full">Download receipt</Button>
          </div>
        )}
      </Link>
    </li>
  )
}

export default BookCard
