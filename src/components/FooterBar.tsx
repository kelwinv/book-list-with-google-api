import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Logo from "@/assets/icon.svg";
import Image from "next/image";

const FooterBar = () => {
  return (
    <footer className="flex h-20 w-full bg-indigo-50">
      <section className="m-auto flex h-full w-full max-w-[min(74rem,90vw)] items-end justify-between border-t-2 border-gray-900 pb-6">
        <a href="https://kelwin.vercel.app/" className="flex items-end gap-2 ">
          <Image src={Logo} alt="Logo" className="w-8" />
          Kelwin vieira
        </a>
        <a
          href="https://github.com/kelwinv/book-list-with-google-api"
          target="_blank"
          className="underline"
        >
          Link do código
        </a>
        <div className="flex gap-3">
          <a href="https://github.com/kelwinv" target="_blank" rel="github">
            <i>
              <AiFillGithub className="h-8 w-8" />
            </i>
          </a>
          <a
            href="https://www.linkedin.com/in/kelwinv/"
            target="_blank"
            rel="Linkedin"
          >
            <i>
              <AiFillLinkedin className="h-8 w-8" />
            </i>
          </a>
        </div>
      </section>
    </footer>
  );
};

export { FooterBar };
