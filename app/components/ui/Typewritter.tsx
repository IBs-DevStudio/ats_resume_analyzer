import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
}

/**
 * Cycles through `words`, typing and deleting each one.
 *
 * IMPORTANT: this is a desktop-only effect. A cycling, blinking-cursor
 * animation reads as flickery/cramped on small screens, so every call site
 * must wrap this in a `hidden md:inline-block` (or similar) container and
 * render a static string as the mobile fallback. Do not render Typewriter
 * unwrapped.
 */
export default function Typewriter({ words, className = "" }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setText(words[0] ?? "");
      return;
    }

    const timeout = setTimeout(
      () => {
        const currentWord = words[index];
        if (isDeleting) {
          setText(currentWord.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
          }
        } else {
          setText(currentWord.substring(0, text.length + 1));
          if (text.length === currentWord.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words]);

  return (
    <span
      className={`text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-[#0b65c2] border-r-2 border-[#0b65c2] pr-1 ${className}`}
    >
      {text}
    </span>
  );
}
