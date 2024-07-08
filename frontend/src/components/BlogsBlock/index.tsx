import {
  BlogsBlockFragment,
  GetPostsThumbQuery,
  LanguageCodeFilterEnum,
  PostThumbFragment,
} from "@/__generated__/graphql"
import React, {useEffect, useState} from "react"
import Image from "next/image"
import Button from "../Button"
import Link from "next/link"
import {getPostThumb} from "@/libs/graphql/utils"

import {languages} from "@/utils/language"
import {getAcfLinkProps} from "@/utils"
import dynamic from "next/dynamic"

import {useLocaleContext} from "@/context/LocaleContext"

import Socials from "../Socials"
const ButtonNext = dynamic(
  () => import("../Icons").then((mod) => mod.ButtonNext),
  {loading: () => <></>}
)
type TBlog = {
  category?: string
  featureImage?: string
  title?: string
  description?: string
  link?: string
}

const defaultDesc = ""

interface Props extends BlogsBlockFragment {}
const PAGE_SIZE = 3

const BlogsBlock = (props: Props) => {
  const [blockListing, setBlockListing] =
    useState<GetPostsThumbQuery["posts"]>()
  const {locale} = useLocaleContext()
  const [page, setPage] = useState(0)

  const sizes = blockListing ? blockListing.nodes.length : 0
  const max_page = blockListing
    ? Math.floor(blockListing?.nodes?.length / PAGE_SIZE)
    : 0

  useEffect(() => {
    ;(async () => {
      const {data} = await getPostThumb(
        locale === "en" ? LanguageCodeFilterEnum.En : LanguageCodeFilterEnum.De
      )
      setBlockListing(data.posts)
    })()
  }, [])

  if (!blockListing && sizes < 1)
    return (
      <div className="container-fluid min-h-[500px] pt-10">
        {locale?.toUpperCase() === LanguageCodeFilterEnum.En
          ? "...Loading"
          : "...Wird geladen"}
      </div>
    )

  return (
    <section className="container-fluid py-20 lg:py-28 lg:pb-20">
      <div className="grid grid-cols-12">
        <div className="col-span-full flex  flex-col gap-10 md:col-span-8">
          {blockListing?.nodes.length === 0 && (
            <div className="container-fluid min-h-[100px] pt-10 text-lg xl:text-2xl">
              {locale?.toUpperCase() === LanguageCodeFilterEnum.En
                ? "No Blog Found"
                : "Blogposts in Bearbeitung"}
            </div>
          )}
          {blockListing &&
            blockListing.nodes
              .slice(
                0,
                (page + 1) * PAGE_SIZE > sizes ? sizes : (page + 1) * PAGE_SIZE
              )
              .map((ele, id) => {
                return (
                  <div
                    key={id}
                    className=" flex flex-wrap gap-5 lg:min-h-[350px] ">
                    <div className="relative min-h-[250px] w-full md:w-[45%]">
                      <Link href={`/${locale}/blog/${ele.slug}` as string}>
                        <Image
                          fill
                          className=" max-h-[400px] w-full object-cover"
                          src={
                            ele.featuredImage?.node?.sourceUrl ||
                            "/blogs/blog-1.png"
                          }
                          alt="blog image"
                        />
                      </Link>
                    </div>
                    <div className="flex w-full flex-col justify-center gap-2 md:w-1/2">
                      <h2 className="text-lg font-semibold uppercase leading-5 text-primary-blue-main">
                        {languages(locale)?.manufacturing}
                      </h2>
                      <h3 className="text-3xl font-bold xl:text-4xl  xl:leading-[48px]">
                        <Link
                          href={`/${locale}/blog/${ele.slug}` as string}
                          className="group hover:text-primary-blue-main">
                          {ele.title}
                        </Link>
                      </h3>
                      <p className="text text-base leading-[22px]">
                        {ele.blogDescription?.blogDescription ||
                          languages(locale)?.blogDescription}
                      </p>
                      <Link
                        href={`/blog/${ele.slug}` as string}
                        className="group mt-5 text-primary-blue-main">
                        {languages(locale)?.readMore}

                        <ButtonNext className="ml-2 inline transition-all group-hover:translate-x-2" />
                      </Link>
                    </div>
                  </div>
                )
              })}
          <div className="mt-10 flex w-full justify-center">
            {sizes > PAGE_SIZE && (page + 1) * PAGE_SIZE < sizes && (
              <Button
                onClick={() =>
                  setPage((prev) => {
                    return prev + 1 >= max_page ? max_page : prev + 1
                  })
                }
                as="button">
                {languages(locale)?.loadMore}
              </Button>
            )}
          </div>
        </div>
        {
          //#region social icon
        }
        <div className="col-span-full mt-10 md:col-span-6 lg:col-span-3 lg:col-start-10 lg:mt-0">
          {props.ctaBlocks?.map((ele, id) => {
            if (id === 0)
              return (
                <div
                  key={id}
                  className="flex w-full flex-col gap-4 rounded-md border border-primary-blue-main p-6">
                  <h3 className="text-2xl font-semibold text-primary-blue-main ">
                    {ele?.title}
                  </h3>
                  <div
                    className="[&>*>a]:underline xl:[&>*]:text-lg xl:[&>*]:leading-[25px]"
                    dangerouslySetInnerHTML={{
                      __html: ele?.contactInfo || "",
                    }}></div>
                  {ele?.ctaButton && (
                    <Button
                      className="mt-4"
                      {...getAcfLinkProps(ele.ctaButton.link)}>
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
                  <h3 className="text-2xl font-semibold text-primary-blue-main ">
                    {ele?.title}
                  </h3>
                  <div
                    className="[&>*>a]:underline [&>*>a]:hover:text-primary-blue-main [&>*]:text-[#140F24] xl:[&>*]:text-lg xl:[&>*]:leading-[25px]"
                    dangerouslySetInnerHTML={{
                      __html: ele?.contactInfo || "",
                    }}></div>
                  {ele?.ctaButton && (
                    <Button
                      className="mt-4 whitespace-normal"
                      {...getAcfLinkProps(ele.ctaButton.link)}>
                      {ele?.ctaButton?.link?.title}
                    </Button>
                  )}
                </div>
              )
          })}
          <div className="mt-6 flex aspect-auto flex-col justify-center gap-4 rounded-md border border-primary-blue-main p-6">
            <h4 className="mb-3 text-2xl font-semibold text-primary-blue-main ">
              Folge uns auf Social Media
            </h4>
            <Socials
              isHover
              mainColor="text-primary-black-main"
              className="col-span-full  mb-3 flex items-center gap-3 lg:col-span-2 lg:gap-4"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogsBlock
