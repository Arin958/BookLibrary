"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { genSalt, hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ratelimit from "../ratelimit";

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">)  => {
    const { email, password } = params;

       const ip = ((await headers()).get("x-forwarded-for") || "127.0.0.1")

    const {success} = await ratelimit.limit(ip)

    if(!success) return redirect("/too-fast")

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if (result?.error) {
            return {
                success: false,
                error: result.error
            }
        }

        return {
            success: true,
            message: "Signed in successfully"
        }
    } catch (error) {
      console.log(error, "error")
      return {
        message: "Failed to sign in",
        success: false
      }
    }
}

export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, password, universityCard, universityId } = params
    const ip = ((await headers()).get("x-forwarded-for") || "127.0.0.1")

    const {success} = await ratelimit.limit(ip)

    if(!success) return redirect("/too-fast")
    const existingUsers = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (existingUsers.length > 0) {
        throw new Error("User already exists")
    }

    const hashedPassword = await hash(password, 10)

    try {
        await db.insert(users).values({
            fullName,
            email,
            universityId,
            password: hashedPassword,
            universityCard,
        })

        //   await signInWithCredentials({ email, password })

        return {
            success: true,
            message: "User created successfully"
        }
    } catch (error) {
        console.log(error, "error")
        return {
            message: "Failed to create user",
            success: false
        }
    }
}