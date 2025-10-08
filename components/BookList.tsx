import React from 'react'
import BookCard from './BookCard';

interface Props {
  title: string,
  books: Book[],
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  if (books.length < 2) return
  return (
    <section className={`space-y-6 ${containerClassName || ""}`}>
      {/* Section Title */}
      <h2 className="font-bebas-neue text-2xl sm:text-3xl md:text-4xl">
        {title}
      </h2>

      {/* Book Grid */}
      {<ul
        className="
          grid 
          gap-4 
          sm:gap-6 
          grid-cols-1 
        
          sm:grid-cols-2
          lg:grid-cols-4 
          xl:grid-cols-4
        "
      >
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>}
    </section>
  )
}

export default BookList
