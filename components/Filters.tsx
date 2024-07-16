"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const links = [
  "all",
  "arduino",
  "electronics",
  "esp8266",
  // "raspberrypi",
  // "multirotor",
  // "esp32",
];

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState<string>(
    searchParams.get("category") || "all"
  );

  const handleFilter = (link: string) => {
    const params = new URLSearchParams(searchParams);

    if (active === link) {
      setActive("all");
      params.delete("category");
    } else {
      setActive(link);
      params.set("category", link.toLowerCase());
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    setActive(category);
  }, [searchParams]);

  return (
    <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full sm:justify-center overflow-auto pt-12 sm:max-w-2xl">
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
      <select
        onChange={(e) => handleFilter(e.target.value)}
        value={active}
        className={`${
          links.includes(active) ? "" : "gradient_blue-purple"
        } custom-select whitespace-nowrap bg-black-100 focus:bg-black-100 focus:outline-none appearance-none rounded-lg px-2 capitalize text-center`}
      >
        <option value="">More</option>
        <option value="raspberrypi">raspberrypi</option>
        <option value="multirotor">multirotor</option>
        <option value="esp32">esp32</option>
      </select>
    </ul>
  );
};

export default Filters;
