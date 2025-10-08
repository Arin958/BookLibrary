import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import "@/style/admin.css"
import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session?.user?.id) redirect("/sign-in")


  const isAdmin = await db.select({ isAdmin: users.role }).from(users).where(eq(users.id, session?.user?.id)).limit(1).then(res => res[0]?.isAdmin === "ADMIN")

  if(!isAdmin) redirect("/")
  return (
    <main className='flex min-h-screen w-full flex-row'>
      <Sidebar session={session} />
      <div className='flex min-h-screen flex-1 flex-col p-5 sm:p-10 w[calc(100%-264px)]'>
        <Header session={session} />
        {children}
      </div>

    </main>
  )
}

export default Layout
