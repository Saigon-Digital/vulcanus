import React, {useState} from "react";
import {twMerge} from "tailwind-merge";
import {TocItem} from "@/utils/toc";

type Props = {
  items: TocItem[];
  title: string;
};

const TableOfContents = ({items, title}: Props) => {
  const [expanded, setExpanded] = useState(true);

  if (items.length < 3) return null;

  // h2 entries are numbered 01, 02...; h3 entries sit under their h2.
  let section = 0;

  return (
    <nav
      aria-label={title}
      className="mx-auto mt-10 max-w-[912px] px-5 lg:mt-14">
      <div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="blog-toc"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex w-full items-center justify-between gap-4 py-4 text-left">
          <span className="text-3xl font-bold xl:text-4xl">{title}</span>
          <span
            aria-hidden
            className="relative flex h-[14px] w-[14px] shrink-0 items-center justify-center">
            <span className="absolute h-[2px] w-full bg-primary-blue-main" />
            <span
              className={twMerge(
                "absolute h-full w-[2px] bg-primary-blue-main transition-transform duration-300",
                expanded && "rotate-90"
              )}
            />
          </span>
        </button>
        <div
          id="blog-toc"
          className={twMerge(
            "grid transition-[grid-template-rows] duration-500",
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}>
          <div className="overflow-hidden">
            <hr className="border-t border-white/20" />
            <ol
              className={twMerge(
                "flex flex-col pb-6 pt-3 transition-opacity duration-300",
                expanded ? "opacity-100" : "opacity-0"
              )}>
              {items.map((item) => {
                if (item.level === 2) section += 1;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      tabIndex={expanded ? undefined : -1}
                      className={twMerge(
                        "flex gap-4 py-2 transition-colors duration-300 hover:text-primary-blue-main",
                        item.level === 3 &&
                          "pl-9 text-base font-normal text-secondary-offWhite-main/70",
                        item.level === 2 && "text-lg font-bold lg:text-xl"
                      )}>
                      {item.level === 2 && (
                        <span className="w-6 shrink-0 text-primary-blue-main">
                          {String(section).padStart(2, "0")}
                        </span>
                      )}
                      <span>{item.text}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TableOfContents;
