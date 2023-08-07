import { BookList } from "@/components/BookComponents/BookList";
import { FooterBar } from "@/components/FooterBar";
import { Header } from "@/components/Header";
import { SearchInput } from "@/components/searchInput";

const HomePage: React.FC = () => {
  return (
    <div className="flex h-full max-h-screen w-full flex-col justify-between bg-indigo-50">
      <Header />
      <main className="flex max-h-[calc(100vh-5rem-6rem)] flex-1 flex-col justify-center gap-8 delay-300 ease-linear">
        <SearchInput />
        <BookList />
      </main>
      <FooterBar />
    </div>
  );
};

export default HomePage;
