"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";


export const createBook = async (params: BookParams) => {
    try {
        const book = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies
        }).returning()

        return {
            success: true,
            message: "Book created successfully",
            data: JSON.parse(JSON.stringify(book[0]))
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "An error occurred while creating Book"
        }
    }
}