"use client";
import { Button, Container } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className="h-24 w-full ">
      <div className="m-auto flex h-full w-full max-w-[min(90vw,75rem)] items-end justify-between">
        <h1>{pathname === "/" ? "Home" : "Detalhes do Livro"}</h1>
        {pathname !== "/" && (
          <Button onClick={handleGoBack} colorScheme="blue" variant="outline">
            Voltar
          </Button>
        )}
      </div>
    </header>
  );
};
export { Header };
