import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <section className='w-full rounded-2xl bg-white p-7'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <h2 className='texl-xl font-semibold'>All Books</h2>
            <Button className='bg-black text-white' asChild>
<Link href="/admin/books/new">Add Book</Link>
            </Button>
        </div>

        <div className='mt-7 w-full overflow-hidden'>
            
        </div>
      
    </section>
  )
}

export default Page
