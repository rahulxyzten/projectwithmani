import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <section className=" pt-[180px] flex w-full flex-col items-center">
      <h1 className="heading3 text-center text-white">Snapgram Top Creators</h1>
      <div className="markdown prose mt-10 w-full max-w-4xl text-white-800 prose-headings:text-white prose-p:text-white-800 prose-a:text-purple prose-blockquote:text-white-800 prose-strong:text-white prose-code:text-white-800 prose-pre:bg-black-400 prose-ol:text-white-800 prose-ul:text-white-800 prose-img:w-full prose-hr:border-dashed prose-hr:border-gray-600">
        <p>
          <Image
            src="/test.png"
            className="rounded-t-lg !bg-transparent object-cover"
            width={400}
            height={400}
            alt="arrow"
          />
        </p>
        <h2>Task 🎯 </h2>
        <p>Your goal is to show a few creators on the right side</p>
        <h2>Example </h2>
        <p></p>
        <h2>Resources</h2>

        <h2>Must Play</h2>
        <p></p>
        <p></p>
        <h2> </h2>
        <p>Not sure how to get started with this? We're here for you .</p>
        <p>Let's take it step by step !</p>
        <p>First and foremost, ask yourself -</p>
        <p></p>
        <p></p>
        <p></p>
        <ul></ul>
        <p>So let's start by implementing the UI first,</p>
        <ul></ul>
        <p></p>
        <ul></ul>
        <p></p>
        <ul></ul>
        <p></p>
      </div>
    </section>
  );
};

export default page;
