import { FaEnvelope, FaGithub } from "react-icons/fa6";

export function Header() {
  return (
    <header className="flex justify-between p-4 text-2xl xs:text-4xl">
      <h1>Diego's Portfolio 🎧</h1>
      <div className="flex gap-4 xs:gap-6 text-xl xs:text-2xl items-center justify-center xs:mx-2">
        <a
          href="mailto:diblattner@gmail.com"
          className="rounded focus-visible:outline-2 focus-visible:outline-secondary-shaded"
          aria-label="My e-mail"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://github.com/diegoblattner"
          className="rounded focus-visible:outline-2 focus-visible:outline-secondary-shaded" 
          target="_blank"
          aria-label="My GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </header>
  );
}
