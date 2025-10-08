import { auth } from '@/auth'
import BookOverview from '@/components/BookOverview'
import BookVideo from '@/components/BookVideo'
import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const session = await auth()
    const id = (await params).id


    const [bookDetails] = await db.select().from(books).where(eq(books.id, id)).limit(1)


    if (!bookDetails) redirect("/404");
    return (
        <>
            <BookOverview {...bookDetails} userId={session?.user?.id as string} />

            <div className='lg:mt-36 mt-16 mb-20 flex flex-col gap-16 lg:flex-row'>
                <section className='flex flex-col gap-7'>
                    <h3>Video</h3>
                    <BookVideo videoUrl={bookDetails.videoUrl} />
                </section>
                <section className='mt-10 flex flex-col gap-7'>
                    <h3>Summary</h3>
                    <div className='space-y-5 text-xl text-gray-500'>
                        {typeof bookDetails.summary === 'string'
                            ? bookDetails.summary.split("\n").map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                            : null}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Page

