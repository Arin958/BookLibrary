

import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import React from 'react'
import { z, ZodType } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import ImageUpload from './ImageUpload'
import Image from 'next/image'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Props<T extends FieldValues> {
    schema: ZodType<T>
    defaultValues: T
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
    type: "SIGN_IN" | "SIGN_UP"
}

const AuthForm = <T extends FieldValues>({
    type,
    schema,
    defaultValues,
    onSubmit
}: Props<T>) => {
    const router = useRouter()
    const isSignIn = type === "SIGN_IN"
    // const form: UseFormReturn<T> = useForm({
    //     resolver: zodResolver(schema),
    //     defaultValues: defaultValues as DefaultValues<T>,
    //     mode: "onSubmit",
    // })
    const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema as ZodType<T, FieldValues>),
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onSubmit",
})



    const handleSubmit: SubmitHandler<T> = async (data) => {
       const result = await onSubmit(data)

       if (result.success) {
        toast.success(`${isSignIn ? "You have successfully Signed in" : " You have successfully Signed up"}`);

        router.push("/")
       } else {
        toast.error("Something went wrong")
       }
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-white">
                {isSignIn ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-sm text-gray-400">
                {isSignIn
                    ? "Welcome back! Please enter your details."
                    : "Enter your details to create an account."}
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {Object.keys(defaultValues).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                                    </FormLabel>
                                    <FormControl>
                                        {field.name === "universityCard" ? (
                                            <ImageUpload onFileChange={field.onChange}/>
                                        ): (
                                            <Input required type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} className='w-full min-h-14 border-none text-base font-bold  text-white focus-visible:ring-0 focus-visible:shadow-none bg-gray-800'/>
                                        )}
                                        
                                    </FormControl>

      
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    
                    <Button type="submit" className='bg-yellow-500 text-white hover:bg-primary inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-bold text-base'>Submit</Button>
                </form>
            </Form>

            <p className="text-center text-base font-medium">
                {isSignIn ? "New to BookNook?" : "Already have an account?"}
                <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="text-blue-400 hover:underline">
                    {isSignIn ? "Create an account" : "Sign in"}
                </Link>
            </p>
        </div>
    )
}

export default AuthForm
