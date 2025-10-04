import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import BookCoverSvg from "./BookCoverSvg"

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide"

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
}

interface Props {
  className?: string
  variant?: BookCoverVariant
  coverColor?: string
  coverImage?: string
  secondBookCoverColor?: string
  secondBookCoverImage?: string
  thirdBookCoverColor?: string
  thirdBookCoverImage?: string
  fanAngle?: number
  stackOffset?: number
  showThirdBook?: boolean
  showSecondBook?: boolean
}

const BookCover = ({ 
  className, 
  variant = "regular", 
  coverColor = "#012A4B",
  coverImage = "https://placehold.co/600x400/000000/FFFFFF/png",
  secondBookCoverColor = "#012A4B",
  secondBookCoverImage = "https://placehold.co/600x400/333333/FFFFFF/png",
  thirdBookCoverColor = "#012A4B",
  thirdBookCoverImage = "https://placehold.co/600x400/555555/FFFFFF/png",
  fanAngle = -8,
  stackOffset = 12,
  showThirdBook = false,
  showSecondBook = true
}: Props) => {
  return (
    <div className={cn("relative transition-all duration-300", className)}>

        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-black/10 via-white/5 to-black/10 blur-2xl"></div>
      {/* Third Book (Optional, most tilted) */}
      {showThirdBook && (
        <div 
          className={cn("absolute top-0 left-0", variantStyles[variant])}
          style={{ 
            transform: `translateY(${stackOffset * 2}px) rotate(${fanAngle * 1.5}deg)`,
            zIndex: 5,
            transformOrigin: 'bottom left',
            opacity: 0.9
          }}
        >
          <BookCoverSvg coverColor={thirdBookCoverColor} />
          <div className="absolute z-10" style={{ left: '12%', width: "87.5%", height: "88%" }}>
            <Image
              src={thirdBookCoverImage}
              alt="third book cover"
              fill
              className="rounded-sm object-fill"
            />
          </div>
        </div>
      )}


{showSecondBook && (
        <div 
          className={cn("absolute top-0 left-0", variantStyles[variant])}
          style={{ 
            transform: `translateY(${stackOffset}px) rotate(${fanAngle}deg)`,
            zIndex: 15,
            transformOrigin: 'bottom left',
            opacity: 0.8
          }}
        >
          <BookCoverSvg coverColor={secondBookCoverColor} />
          <div className="absolute z-20" style={{ left: '12%', width: "87.5%", height: "88%" }}>
            <Image
              src={secondBookCoverImage}
              alt="second book cover"
              fill
              className="rounded-sm object-fill"
            />
          </div>
        </div>
)}
      

      {/* Second Book (Diagonal/Fan position) */}
      {/* <div 
        className={cn("absolute top-0 left-0", variantStyles[variant])}
        style={{ 
          transform: `translateY(${stackOffset}px) rotate(${fanAngle}deg)`,
          zIndex: 10,
          transformOrigin: 'bottom left'
        }}
      >
        <BookCoverSvg coverColor={secondBookCoverColor} />
        <div className="absolute z-10" style={{ left: '12%', width: "87.5%", height: "88%" }}>
          <Image
            src={coverImage}
            alt="second book cover"
            fill
            className="rounded-sm object-fill"
          />
        </div>
      </div> */}

      {/* Top Book (Main book positioned normally) */}
      <div 
        className={cn("relative", variantStyles[variant])}
        style={{ zIndex: 20 }}
      >
        <BookCoverSvg coverColor={coverColor} />
        <div className="absolute z-30" style={{ left: '12%', width: "87.5%", height: "88%" }}>
          <Image
            src={coverImage}
            alt="book cover"
            fill
            className="rounded-sm object-fill"
          />
        </div>
      </div>
    </div>
  )
}

export default BookCover