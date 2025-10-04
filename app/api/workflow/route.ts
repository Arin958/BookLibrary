import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import config from "@/lib/config";
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer"




type InitialData = {
    email: string;
    fullName: string
}

const ONE_DAY_IN_SECONDS = 24 * 60 * 60 * 1000
const THREE_DAY_IN_SECONDS = 3 * ONE_DAY_IN_SECONDS
const THIRY_DAY_IN_SECONDS = 30 * ONE_DAY_IN_SECONDS

const getUserState = async (email: string): Promise<UserState> => {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (user.length === 0) {
        return "non-active"
    }

    const lastActivity = new Date(user[0].lastActivity!).getTime()

    const now = new Date();
    const timeDifference = now.getTime() - lastActivity;
    
    if(timeDifference < THREE_DAY_IN_SECONDS) {
        return "active"
    } else if (timeDifference < THIRY_DAY_IN_SECONDS) {
        return "non-active"
    } else {
        return "non-active"
    }
}

async function sendEmail({ message, email, subject }: { message: string; email: string, subject: string }) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.env.GMAIL_USER,
            pass: config.env.GMAIL_PASS
        },
    })

    await transporter.sendMail({
        from: `"My App" <${process.env.GMAIL_USER}>`,
        to: email,
        subject,
        text: message,
        html: `<p>${message}</p>`,
    })

    console.log(`✅ Sent "${message}" email to ${email}`)
}
type UserState = "non-active" | "active"



export const { POST } = serve<InitialData>(async (context) => {
    const { email,fullName } = context.requestPayload

    // Welcome Email


    await context.run("new-signup", async () => {
        await sendEmail({
            email,
            subject: "Welcome to My App",
            message: `Hello ${fullName}, welcome to My App!`
        })
    })

    await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

    while (true) {
        const state = await context.run("check-user-state", async () => {
            return await getUserState(email)
        })

        if (state === "non-active") {
            await context.run("send-email-non-active", async () => {
   await sendEmail({
    message: "Email to non-active users",
    email,
    subject: "Notification from My App"
})
            })
        } else if (state === "active") {
            await context.run("send-email-active", async () => {
               await sendEmail({
    message: "Send newsletter to active users",
    email,
    subject: "Notification from My App"
})
            })
        }

        await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
    }
})

