"use client"


import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { borrowbook } from '@/lib/actions/book'
interface Props {
    userId: string
    bookId: string
    borrowEligibility: {
        isEligible: boolean
        message: string
    }
}

const BorrowBook = ({ userId, bookId, borrowEligibility }: Props) => {
    const router = useRouter();

    const [borrowing, setBorrowing] = useState(false);

    const handleBorrow = async () => {
        if (!borrowEligibility.isEligible) {
            toast.error(borrowEligibility.message);
        }

        setBorrowing(true);

        try {
            const result = await borrowbook({ userId, bookId })
            if (result.success) {
                toast.success(result.message);
                router.push(`/my-profile`)
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
        } finally {
            setBorrowing(false);
        }
    }
    return (
        <Button className='book-overview_btn bg-yellow-400 hover:bg-amber-500' onClick={handleBorrow} disabled={borrowing}>
            <Image src="/icons/book.svg" alt='arrow-right' width={20} height={20} />
            <p className='font-bebas-neue text-xl text-black'>{borrowing ? "Borrowing..." : "Borrow Book"}</p>
        </Button>
    )
}

export default BorrowBook
