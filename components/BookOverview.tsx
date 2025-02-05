import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  color,
  cover,
  isbn,
  video,
  summary,
  isLoanedBook=false,
}: Book) => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="">{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-lime-200">{author}</span>
          </p>
          <p>
            Category:{" "}
            <span className="font-semibold text-lime-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-2">
            <Image src="./icons/star.svg" width={22} height={33} alt="start" />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books: <span className="">{totalCopies}</span>
          </p>
          <p>
            Available Books: <span className="">{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        <Button className="book-overview_btn">
          <Image src="/icons/book.svg" width={20} height={20} alt="book" />
          <p className="font-bebas-neue text-xl text-dark-100">Borrow</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={color}
            coverImage={cover}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover variant="wide" coverColor={color} coverImage={cover} />
          </div>
        
      </div>
    </section>
  );
};

export default BookOverview;
