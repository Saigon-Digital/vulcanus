import {
  BlogsBlockFragment,
  LanguageCodeFilterEnum,
} from "@/__generated__/graphql"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Button from "../Button"
import { useRouter } from "next/router"
import { getPostThumb } from "@/libs/graphql/utils"
import { languages } from "@/utils/language"
import { getAcfLinkProps } from "@/utils"
import dynamic from "next/dynamic"
import { useLocaleContext } from "@/context/LocaleContext"
import Socials from "../Socials"

const ButtonNext = dynamic(
  () => import("../Icons").then((mod) => mod.ButtonNext),
  { loading: () => <></> }
)

interface Props extends BlogsBlockFragment {}

const PAGE_SIZE = 3

type Post = {
  language?: { code?: string } | null
  featuredImage?: { node?: { sourceUrl?: string } | null } | null
  title?: string | null
  isSticky?: boolean | null
  date?: string | null
  slug?: string | null
  blogDescription?: { blogDescription?: string | null } | null
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | "...")[] = [1]
  if (current > 3) pages.push("...")
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
  if (current < total - 2) pages.push("...")
  pages.push(total)
  return pages
}

const BlogsBlock = (props: Props) => {
  const { locale } = useLocaleContext()
  const router = useRouter()
  const currentPage = parseInt((router.query.page as string) || "1") || 1

  const [posts, setPosts] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    isFirstRender.current = false
    setLoading(true)
    const lang = locale === "en" ? LanguageCodeFilterEnum.En : LanguageCodeFilterEnum.De
    const offset = (currentPage - 1) * PAGE_SIZE
    getPostThumb(lang).then(({ data }) => {
      const sorted = [...(data.posts?.nodes ?? [])].sort((a, b) => {
        if (a.isSticky !== b.isSticky) return a.isSticky ? -1 : 1
        return new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
      })
      setPosts(sorted.slice(offset, offset + PAGE_SIZE))
      setTotal(sorted.length)
      setLoading(false)
    })
  }, [locale, currentPage])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const pageBase = locale === "de" ? "/blog-de/page" : "/blog/page"

  if (loading && posts.length === 0)
    return (
      <div className="container-fluid min-h-[500px] pt-10">
        {locale?.toUpperCase() === LanguageCodeFilterEnum.En ? "...Loading" : "...Wird geladen"}
      </div>
    )

  return (
    <section ref={sectionRef} className="container-fluid py-20 lg:py-28 lg:pb-20">
      <div className="grid grid-cols-12">
        <div className="col-span-full flex flex-col gap-10 md:col-span-8">
          {!loading && posts.length === 0 && (
            <div className="container-fluid min-h-[100px] pt-10 text-lg xl:text-2xl">
              {locale?.toUpperCase() === LanguageCodeFilterEnum.En
                ? "No Blog Found"
                : "Blogposts in Bearbeitung"}
            </div>
          )}

          {posts.map((ele, id) => (
            <div key={id} className="flex flex-wrap gap-5 lg:min-h-[350px]">
              <div className="relative min-h-[250px] w-full md:w-[45%]">
                <Link href={`/${locale}/blog/${ele.slug}` as string}>
                  <Image
                    fill
                    className="max-h-[400px] w-full object-cover"
                    src={ele.featuredImage?.node?.sourceUrl || "/blogs/blog-1.png"}
                    alt={ele.title || "blog image"}
                  />
                </Link>
              </div>
              <div className="flex w-full flex-col justify-center gap-2 md:w-1/2">
                <h2 className="text-lg font-semibold uppercase leading-5 text-primary-blue-main">
                  {languages(locale)?.manufacturing}
                </h2>
                <h3 className="text-3xl font-bold xl:text-4xl xl:leading-[48px]">
                  <Link
                    href={`/${locale}/blog/${ele.slug}` as string}
                    className="group hover:text-primary-blue-main">
                    {ele.title}
                  </Link>
                </h3>
                <p className="text text-base leading-[22px]">
                  {ele.blogDescription?.blogDescription || languages(locale)?.blogDescription}
                </p>
                <Link
                  href={`/blog/${ele.slug}` as string}
                  className="group mt-5 text-primary-blue-main">
                  {languages(locale)?.readMore}
                  <ButtonNext className="ml-2 inline transition-all group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-2">
              <Link
                scroll={false} href={`${pageBase}/${currentPage - 1}`}
                className={`flex h-10 w-10 items-center justify-center rounded border text-lg font-medium transition-colors leading-[unset] ${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "border-white text-white"
                }`}>
                {`<`}
              </Link>
              {getPageNumbers(currentPage, totalPages).map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <Link
                    key={p}
                    scroll={false}
                    href={`${pageBase}/${p}`}
                    className={`flex h-10 w-10 items-center justify-center rounded border text-sm font-medium transition-colors ${
                      p === currentPage
                        ? "border-primary-blue-main bg-primary-blue-main text-white"
                        : "border-gray-300 hover:border-primary-blue-main hover:text-primary-blue-main"
                    }`}>
                    {p}
                  </Link>
                )
              )}
              <Link
                scroll={false} href={`${pageBase}/${currentPage + 1}`}
                className={`flex h-10 w-10 items-center justify-center rounded border text-lg font-medium transition-colors leading-[unset] ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "border-white text-white"
                }`}>
                {`>`}
              </Link>
            </div>
          )}
        </div>

        <div className="col-span-full mt-10 md:col-span-6 lg:col-span-3 lg:col-start-10 lg:mt-0">
          {props.ctaBlocks?.map((ele, id) => {
            if (id === 0)
              return (
                <div
                  key={id}
                  className="flex w-full flex-col gap-4 rounded-md border border-primary-blue-main p-6">
                  <h3 className="text-2xl font-semibold text-primary-blue-main">{ele?.title}</h3>
                  <div
                    className="[&>*>a]:underline xl:[&>*]:text-lg xl:[&>*]:leading-[25px]"
                    dangerouslySetInnerHTML={{ __html: ele?.contactInfo || "" }}
                  />
                  {ele?.ctaButton && (
                    <Button className="mt-4" {...getAcfLinkProps(ele.ctaButton.link)}>
                      {ele?.ctaButton?.link?.title}
                    </Button>
                  )}
                </div>
              )
            if (id === 1)
              return (
                <div
                  key={id}
                  className="mt-6 flex w-full flex-col gap-4 rounded-md border bg-[#E6ECF3] p-6">
                  <h3 className="text-2xl font-semibold text-primary-blue-main">{ele?.title}</h3>
                  <div
                    className="[&>*>a]:underline [&>*>a]:hover:text-primary-blue-main [&>*]:text-[#140F24] xl:[&>*]:text-lg xl:[&>*]:leading-[25px]"
                    dangerouslySetInnerHTML={{ __html: ele?.contactInfo || "" }}
                  />
                  {ele?.ctaButton && (
                    <Button className="mt-4 whitespace-normal" {...getAcfLinkProps(ele.ctaButton.link)}>
                      {ele?.ctaButton?.link?.title}
                    </Button>
                  )}
                </div>
              )
          })}
          <div className="mt-6 flex aspect-auto flex-col justify-center gap-4 rounded-md border border-primary-blue-main p-6">
            <h4 className="mb-3 text-2xl font-semibold text-primary-blue-main">
              {languages(locale)?.followUs}
            </h4>
            <Socials
              isHover
              mainColor="text-primary-black-main"
              className="col-span-full mb-3 flex items-center gap-3 lg:col-span-2 lg:gap-4"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogsBlock
