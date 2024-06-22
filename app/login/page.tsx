"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const page = () => {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);

  const handleLogin = async (provider: ClientSafeProvider) => {
    try {
      const result = await signIn(provider.id, {
        callbackUrl: "/", // Redirect to home page after login
      });

      if (result?.error) {
        console.error("Login error:", result.error);
      }
    } catch (error) {
      console.log("Unexpected error: ", error);
    }
  };

  return (
    <div className="relative z-10 flex h-screen w-screen justify-center">
      <div className="relative z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden sm:rounded-2xl bg-gradient">
        <div className="flex flex-col items-center justify-center space-y-3 px-4 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/PWM.png"
              alt="Logo"
              width={65}
              height={65}
              className="object-contain"
            />
          </Link>
          <h3 className="text-xl font-semibold text-gray-300">
            Sign in to projectwithmani
          </h3>
          <p className="text-sm text-gray-500">
            Start creating superpowers project
          </p>
        </div>
        <div className="flex flex-col space-y-3 px-4 pb-8 pt-5 sm:px-16">
          <div className="flex space-x-2">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => handleLogin(provider)}
                  className="group flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all border-gray-400 bg-white-500 text-gray-600 hover:bg-gray-300"
                >
                  <FcGoogle className=" size-6" />
                </button>
              ))}
            <button
              type="button"
              className="group flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all border-gray-400 bg-white-500 text-gray-600 hover:bg-gray-300"
            >
              <FaGithub className=" size-6" />
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Don't have an account?
            <Link
              className="font-semibold text-gray-500 transition-colors hover:text-gray-400"
              href="/register"
            >
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
