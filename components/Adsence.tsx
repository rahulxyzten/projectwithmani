"use client";
import Script from "next/script";
import React from "react";

type AdsenceType = {
  pId: string;
}

const Adsence = ({ pId }: AdsenceType) => {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7740201598554600"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

export default Adsence;
