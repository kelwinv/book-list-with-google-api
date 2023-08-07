"use client";

import { FooterBar } from "@/components/FooterBar";
import { Header } from "@/components/Header";
import { getBookDetails } from "@/utils/googleBooksAPI";
import { Container } from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type BookDetailsType = {
  params: {
    id: string;
  };
};

interface ImageLinks {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  smallThumbnail: string;
  extraLarge: string;
}

type bookType = {
  id: string;
  price?: { amount: number; currencyCode: string };
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    contentVersion: string;
    imageLinks?: ImageLinks;
    language: string;
    mainCategory: string;
    previewLink: string;
    saleInfo: {
      buyLink: string;
    };
  };
};

export default function BookDetails({ params }: BookDetailsType) {
  const [bookDetails, setBookDetails] = useState<bookType>();

  const handleGetBookDetails = useCallback(
    async (id: string) => {
      try {
        const book = await getBookDetails<bookType>(id);
        setBookDetails(book);
      } catch (error: unknown) {
        console.error(error);
      }
    },
    [setBookDetails],
  );

  useEffect(() => {
    if (!params.id) return;
    handleGetBookDetails(params?.id);
  }, [params.id, handleGetBookDetails]);

  if (!params.id) return <p>Id do livro é necessário</p>;
  if (!bookDetails) return <p>Livro não encontrado</p>;

  const imageLoader = () => {
    const imageLink = Object.values(bookDetails.volumeInfo.imageLinks || [])[0];

    if (imageLink.startsWith("http://")) {
      const secureImageLink = imageLink.replace("http://", "https://");
      return secureImageLink;
    } else {
      return imageLink;
    }
  };

  return (
    <section className="flex h-full w-full flex-col justify-between bg-indigo-50">
      <Header />
      <Container className="h-[90vh] min-w-[80vw] max-w-[90vw] overflow-y-auto pb-12">
        <main className="mx-auto mt-4 w-full rounded-lg border bg-white p-4 shadow-md">
          <header className="bg-blue-700 py-4 text-center text-white">
            <h1 className="mb-1 text-2xl font-bold">
              {bookDetails.volumeInfo.title}
            </h1>
            <p className="mb-2 text-lg">{bookDetails.volumeInfo.subtitle}</p>
            <p>Data de Publicação: {bookDetails.volumeInfo.publishedDate}</p>
          </header>
          {bookDetails.volumeInfo.imageLinks && (
            <div className="flex">
              <Image
                loader={imageLoader}
                src={"book-loading.jpg"}
                alt="Miniatura do Livro"
                className="ml-auto mt-2 h-auto max-w-full"
                height={128}
                width={100}
              />
            </div>
          )}
          <div className="p-4">
            <p>
              <strong>Autor(es):</strong>{" "}
              {bookDetails.volumeInfo.authors?.join(", ")}
            </p>
            <p>
              <strong>Editora:</strong> {bookDetails.volumeInfo.publisher}
            </p>
            <p>
              <strong>Descrição:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: bookDetails.volumeInfo.description,
                }}
              />
            </p>
            <p>
              <strong>Número de Páginas:</strong>{" "}
              {bookDetails.volumeInfo.pageCount}
            </p>
            <p>
              <strong>Categorias:</strong>{" "}
              {bookDetails.volumeInfo.categories?.join(", ")}
            </p>
            <p>
              <strong>Classificação Média:</strong>{" "}
              {bookDetails.volumeInfo.averageRating}
            </p>
            <p>
              <strong>Número de Avaliações:</strong>{" "}
              {bookDetails.volumeInfo.ratingsCount}
            </p>
            <p>
              <strong>Idioma:</strong> {bookDetails.volumeInfo.language}
            </p>
          </div>
          <footer className="bg-blue-700 py-2 text-center text-white">
            <p>
              <strong>Link de Pré-visualização:</strong>{" "}
              <a
                href={bookDetails.volumeInfo.previewLink}
                target="_blank"
                className="text-blue-200"
              >
                Clique aqui
              </a>
            </p>
            {bookDetails.volumeInfo.saleInfo?.buyLink && (
              <p>
                <strong>Link de Compra:</strong>{" "}
                <a
                  href={bookDetails.volumeInfo.saleInfo.buyLink}
                  target="_blank"
                  className="text-blue-200"
                >
                  Clique aqui
                </a>
              </p>
            )}
          </footer>
        </main>
      </Container>
      <FooterBar />
    </section>
  );
}
