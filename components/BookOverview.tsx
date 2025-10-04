import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'

const BookOverview = ({ title, author, genre, rating, total_copies, available_copies, description, color, cover, isLoanedBook} : Book) => {
    console.log(available_copies)
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
                        <Image src="/icons/star.svg" alt='star' width={20} height={20}/>
                        <p>{rating}</p>
                    </div>
                </div>

                <div className='book-copies'>
                    <p>
                        Total Books: <span>{total_copies}</span>
                    </p>

                    <p>
                        Available Books: <span>{available_copies}</span>
                    </p>
                </div>
                <p className='book-description'>
                    {description}
                </p>
                <Button className='book-overview_btn bg-yellow-400 hover:bg-amber-500'>
                    <Image src="/icons/book.svg" alt='arrow-right' width={20} height={20}/>
                    <p className='font-bebas-neue text-xl text-black'>Borrow Book</p>
                </Button>
            </div>

            <div className='relative flex flex-1 justify-center'>
                <div className='relative'>
                    <BookCover className='z-10' variant="wide" coverImage={cover} coverColor={color} />
                </div>
            </div>

        </section>
    )
}

export default BookOverview
