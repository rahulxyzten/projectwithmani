"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const links = [
  "all",
  "arduino",
  "electronics",
  "esp8266",
  "more",
  // "raspberrypi",
  // "multirotor",
  // "esp32",
];

const Filters = () => {
  const [active, setActive] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (link: string) => {
    const params = new URLSearchParams(searchParams);

    if (active === link) {
      setActive("");
      params.delete("category");
    } else {
      setActive(link);
      params.set("category", link.toLowerCase());
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full gap-2 overflow-auto py-12 sm:max-w-2xl">
      {links.map((link) => (
        <button
          key={link}
          onClick={() => handleFilter(link)}
          className={`${
            active === link ? "gradient_blue-purple" : ""
          } whitespace-nowrap rounded-lg px-8 py-2.5 capitalize`}
        >
          {link}
        </button>
      ))}
    </ul>
  );
};

export default Filters;
