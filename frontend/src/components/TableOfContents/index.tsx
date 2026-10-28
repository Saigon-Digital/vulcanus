import React from "react";
import {TocItem} from "@/utils/toc";

type Props = {
  items: TocItem[];
  title: string;
};

const TableOfContents = ({items, title}: Props) => {
  if (items.length < 3) return null;

  return (
    <nav
      aria-label={title}
      className="mx-auto mt-10 max-w-[912px] px-5 lg:mt-14">
      <details
        open
        className="rounded border border-white/20 bg-white/5 px-5 py-4">
        <summary className="cursor-pointer text-xl font-bold">{title}</summary>
        <ol className="mt-4 flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-5" : ""}>
              <a
                href={`#${item.id}`}
                className={
                  item.level === 3
                    ? "text-base text-white/80 hover:text-primary-blue-main hover:underline"
                    : "text-base font-semibold hover:text-primary-blue-main hover:underline"
                }>
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
};

export default TableOfContents;
