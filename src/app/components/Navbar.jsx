"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

function Navbar() {
  //
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //
  const { data: session, isPending } = useSession();
  console.log(session);
  if (isPending) {
    return <p>Loading...</p>;
  }
  //
  const navLink = (
    <>
      <li>
        <Link href="#">Features</Link>
      </li>
      <li>
        <Link href="#" className="font-medium text-accent" aria-current="page">
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="#">Pricing</Link>
      </li>
    </>
  );
  const authLink = (
    <>
      {session?.user ? (
        <>
          <Link href="/Profile">{session?.user.name}</Link>
        </>
      ) : (
        <>
          {" "}
          <Link href="/sign-in">Login</Link>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            {/* <Logo /> */}
            <Link href="/" className="font-bold">
              ACME
            </Link>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">{navLink}</ul>
        <div className="hidden items-center gap-4 md:flex">{authLink}</div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {navLink}
            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              {authLink}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
