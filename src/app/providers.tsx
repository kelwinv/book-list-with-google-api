"use client";

import { BookProvider } from "@/context/BookListContext";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <BookProvider>{children}</BookProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
