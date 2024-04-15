import * as React from "react";
import Link from "next/link";
import {useLocaleContext} from "@/context/LocaleContext";
import {languages} from "@/utils/language";
export default function NotFound() {
  const {locale} = useLocaleContext();
  return (
    <main className="grid min-h-full place-items-center bg-[#050014]  px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-dark_blue text-base font-semibold">404</p>
        <h1 className="text-dark_blue mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {languages(locale)?.notFound.title}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-300">
          {languages(locale)?.notFound.description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            locale={locale}
            className="hover:bg-indian_red rounded-md  bg-primary-blue-main px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {languages(locale)?.notFound.btnText}
          </Link>
        </div>
      </div>
    </main>
  );
}
