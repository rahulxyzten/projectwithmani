"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState("");

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setMenuAnimation("slideOut");
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setMenuAnimation("");
      }, 300); // duration of slideOut animation
    } else {
      setIsMobileMenuOpen(true);
      setMenuAnimation("slideIn");
    }
  };

  const handleLinkClick = () => {
    setMenuAnimation("slideOut");
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setMenuAnimation("");
    }, 300); // duration of slideOut animation
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`flex-center fixed top-0 z-50 w-full border-b-2 border-black-200 py-7 text-white ${isScrolled ? 'bg-black-100 bg-opacity-95' : 'bg-black-100'}`}>
      <div className="flex-between mx-auto w-full max-w-screen-2xl px-6 xs:px-8 sm:px-16">
        <Link href="/">
          <Image src="/PWM.png" alt="logo" width={55} height={40} />
        </Link>

        <div className="flex items-center justify-between">
          <ul className="flex-center gap-x-3 max-md:hidden md:gap-x-5">
            <li className="body-text !font-bold">
              <Link href="/tutorials">Tutorials</Link>
            </li>
            <li className="body-text text-gradient_blue-purple !font-bold">
              <Link href="#">I</Link>
            </li>
            <li className="body-text !font-bold">
              <Link href="/gallery">Gallery</Link>
            </li>
            <li className="body-text text-gradient_blue-purple !font-bold">
              <Link href="#">I</Link>
            </li>
            <li className="body-text !font-bold">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="block md:hidden focus:outline-none"
        >
          <Image
            src="/hamburger-menu.svg"
            width={30}
            height={30}
            alt="Hamburger Menu"
          />
        </button>

        <ul className="flex-center gap-x-3 max-md:hidden md:gap-x-5">
          <li className="body-text text-gradient_blue-purple !font-bold">
            <Link href="#">Login</Link>
          </li>
          <li className="body-text text-gradient_blue-purple !font-bold">
            <Link href="#">Sign Up</Link>
          </li>
          <li className="body-text text-gradient_blue-purple !font-bold">
            <Link href="/create-project">Create Project</Link>
          </li>
          <li className="body-text text-gradient_blue-purple !font-bold">
            <Link href="/create-post">Create Post</Link>
          </li>
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black-100 bg-opacity-99 text-center animate-${menuAnimation}`}
        >
          <button
            onClick={toggleMobileMenu}
            className="absolute top-10 right-8 focus:outline-none text-white"
          >
            <Image src="/close.svg" width={30} height={30} alt="Close Menu" />
          </button>
          <ul className="flex flex-col gap-y-6">
            <li className="body-text !font-bold">
              <Link href="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>

            <li className="body-text !font-bold">
              <Link href="/tutorials" onClick={handleLinkClick}>
                Tutorials
              </Link>
            </li>
            <li className="body-text !font-bold">
              <Link href="/gallery" onClick={handleLinkClick}>
                Gallery
              </Link>
            </li>
            <li className="body-text !font-bold">
              <Link href="/about" onClick={handleLinkClick}>
                About
              </Link>
            </li>

            <li className="body-text text-gradient_blue-purple !font-bold">
              <Link href="#" onClick={handleLinkClick}>
                Login
              </Link>
            </li>
            <li className="body-text text-gradient_blue-purple !font-bold">
              <Link href="#" onClick={handleLinkClick}>
                Sign Up
              </Link>
            </li>
            <li className="body-text text-gradient_blue-purple !font-bold">
              <Link href="/create-project" onClick={handleLinkClick}>
                Create Project
              </Link>
            </li>
            <li className="body-text text-gradient_blue-purple !font-bold">
              <Link href="/create-post" onClick={handleLinkClick}>
                Create Post
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
