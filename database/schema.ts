
import { pgTable, text, uuid, integer, varchar, pgEnum, date, timestamp } from "drizzle-orm/pg-core";



export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"])

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"])

export const BORROM_STATUS_ENUM = pgEnum("borrow_status", ["BORROWED", "RETURN"])

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    universityId: integer("university_id").notNull().unique(),
    password: text("password").notNull(),
    universityCard: text("university_card").notNull(),
    status: STATUS_ENUM("status").notNull().default("PENDING"),
    role: ROLE_ENUM("role").notNull().default("USER"),
    lastActivity: date("last_activity").defaultNow(),
    createdAt: timestamp("created_at", {
        withTimezone: true
    }).defaultNow(),
})