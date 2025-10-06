import BookForm from '@/components/admin/forms/BookForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
    <Button asChild className='bg-black text-white'>
        <Link href="/admin/books">Back</Link>
    </Button>

    <section className='w-full max-w-2xl'>
        <BookForm/>
    </section>
      
    </>
  )
}

export default Page
