import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'
import BorrowBook from './BorrowBook'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'

interface Props extends Book {
    userId: string
}

const BookOverview = async ({ title, author, genre, rating, totalCopies, availableCopies, description, coverColor, coverUrl, isLoanedBook, id, userId }: Props) => {

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)

    if (!user) return null;


    const borrowEligibility = {
        isEligible: availableCopies > 0 && user.status === "APPROVED",
        message: availableCopies < 0 ? "Book is not available" : "You are not eligible to borrow this book",
    }
    const bookId = id

    return (
        <section className='book-overview'>
            <div className='flex flex-1 flex-col gap-5'>
                <h1>{title}</h1>
                <div className='book-info'>
                    <p>
                        By <span className='font-semibold text-yellow-400'>{author}</span>
                    </p>
                    <p>
                        Category <span className='font-semibold text-yellow-400'>{genre}</span>
                    </p>

                    <div className='flex flex-row gap-1'>
                        <Image src="/icons/star.svg" alt='star' width={20} height={20} />
                        <p>{rating}</p>
                    </div>
                </div>

                <div className='book-copies'>
                    <p>
                        Total Books: <span>{totalCopies}</span>
                    </p>

                    <p>
                        Available Books: <span>{availableCopies}</span>
                    </p>
                </div>
                <p className='book-description'>
                    {description}
                </p>
                {/* Borrow Book button */}
                <BorrowBook bookId={bookId} userId={userId} borrowEligibility={borrowEligibility} />
            </div>

            <div className='relative flex flex-1 justify-center'>
                <div className='relative'>
                    <BookCover className='z-10' variant="wide" coverImage={coverUrl} coverColor={coverColor} />
                </div>
            </div>

        </section>
    )
}

export default BookOverview
