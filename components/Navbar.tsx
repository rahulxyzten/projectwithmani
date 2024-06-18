import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex-center fixed top-0 z-50 w-full border-b-2 border-black-200 py-7 text-white bg-black-100">
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
              <Link href="/gallary">Gallery</Link>
            </li>
            <li className="body-text text-gradient_blue-purple !font-bold">
              <Link href="#">I</Link>
            </li>
            <li className="body-text !font-bold">
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        <Image
          src="/hamburger-menu.svg"
          width={30}
          height={30}
          alt="Hamburger Menu"
          className="block md:hidden"
        />

        <ul className="flex-center gap-x-3 max-md:hidden md:gap-x-5">
          <li className="body-text text-gradient_blue-purple !font-bold">
            <Link href="#">
              Login
            </Link>
          </li>
          <li className="body-text text-gradient_blue-purple !font-bold">
            <Link href="#">
              Sign Up
            </Link>
          </li>
          <li className="body-text text-gradient_blue-purple !font-bold">
            <Link href="/create-project">
              Create
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
