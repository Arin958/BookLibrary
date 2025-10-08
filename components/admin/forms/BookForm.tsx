"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { Path, useForm } from 'react-hook-form'
import React from 'react'
import { z } from 'zod'
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


import { bookSchema } from '@/lib/validation'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/ImageUpload'
import ColorPicker from '../ColorPicker'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createBook } from '@/lib/admin/action/books'


interface Props extends Partial<Book> {
  type?: "create" | "update"
}

const BookForm = ({
  type,
  ...book
}: Props) => {

  const router = useRouter()


  // const form: UseFormReturn<T> = useForm({
  //     resolver: zodResolver(schema),
  //     defaultValues: defaultValues as DefaultValues<T>,
  //     mode: "onSubmit",
  // })


  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "000000",
      videoUrl: "",
      summary: "",
    },
    mode: "onSubmit",
  });



  const handleSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values);

    if (result.success) {
      toast.success(result.message);

      router.push(`/admin/books/${result.data.id}`)
    } else {
      toast.error(result.message);
    }

  }

  return (
    <div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Title
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book title"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"author"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book author"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"genre"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Genre
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Book genre"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Rating
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    placeholder="Book rating"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"totalCopies"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Total Copies
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10000}
                    placeholder="Total copies"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"coverUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Image
                </FormLabel>
                <FormControl>
                  {/*    <FileUpload /> */}
                  <ImageUpload type='image' accept='image/*' placeholder='Upload cover image' folder='books/covers' variant='light' onFileChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverColor"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Primary Color
                </FormLabel>
                <FormControl>
                  {/* Color Picker */}
                  <ColorPicker value={field.value} onPickerChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book description"
                    {...field}
                    rows={10}
                    className="book-form_input"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"videoUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Trailer
                </FormLabel>
                <FormControl>
                  {/*    <FileUpload /> */}
                  <ImageUpload type='video' accept='video/*' placeholder='Upload trailer' folder='books/videos' variant='light' onFileChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"summary"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book summary"
                    {...field}
                    rows={5}
                    className="book-form_input"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="book-form_btn text-white">
            Add Book to Library
          </Button>
        </form>
      </Form>


    </div>
  )
}


export default BookForm
