import {PrivacyPolicyFragment} from "@/__generated__/graphql"
import * as React from "react"

import {useState} from "react"
import {languages} from "@/utils/language"
import {useLocaleContext} from "@/context/LocaleContext"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"
function PrivacyPolicy(props: PrivacyPolicyFragment) {
  const [active, setActive] = useState(-1)
  const {locale} = useLocaleContext()
  const sizes = props.terms?.length || 0
  React.useEffect(() => {}, [active])

  const scrollTo = (active: number) => {
    if (typeof document === undefined || typeof window === undefined) return
    setActive(active)
    let id = ""
    if (active === -1) id = "introduce"
    else
      id =
        //@ts-ignore
        props.terms
          ?.find((ele, id) => id === active)
          ?.title?.replace(" ", "") || ""
    const element = document.getElementById(id)
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80

      window.scrollTo({top: top, behavior: "smooth"})
    }
  }

  return (
    <section className="container-block introduce-block py-28 ">
      <div className="grid grid-cols-12 gap-y-10 px-5">
        <div className="col-span-full flex flex-wrap gap-4 md:col-span-4 md:flex-col lg:col-span-3 lg:col-start-2">
          {sizes > 1 && (
            <div className="top-[140px] flex flex-col gap-3 border-l-2 border-dashed border-primary-blue-main/40 pl-6 md:sticky">
              <p
                className={twMerge(
                  "cursor-pointer font-semibold",
                  active === -1 && "text-primary-blue-main "
                )}
                onClick={() => scrollTo(-1)}>
                {languages(locale)?.introduce}
              </p>
              <ul
                className={twMerge(
                  "list-decimal pl-5",
                  sizes > 1 ? "list-decimal" : "list-disc"
                )}>
                {props.terms?.map((ele: any, id: number) => {
                  let size = props.terms ? props.terms.length - 1 : 0
                  return (
                    <motion.li
                      // onViewportEnter={() => setActive(id)}
                      style={{textAlign: "left"}}
                      key={id}
                      className={twMerge(
                        `relative cursor-pointer font-normal`,
                        active === id &&
                          "font-semibold text-primary-blue-main after:absolute after:-left-[46px] after:top-0 after:h-5 after:w-[2px] after:border-l-2 after:border-primary-blue-main",
                        id === size ? "-mb-2" : "mb-3"
                      )}>
                      <button
                        className="-mt-[1px] max-w-[250px] text-left align-text-top"
                        onClick={(e) => scrollTo(id)}>
                        {ele?.title}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
        <div
          className={twMerge(
            "content col-span-full flex flex-col md:col-span-7 xl:col-span-6",
            sizes < 2 &&
              "md:col-span-full md:col-start-3 lg:col-span-10 lg:col-start-2"
          )}>
          <div className=" pb-4">
            <div
              id="introduce"
              dangerouslySetInnerHTML={{__html: props.introduction || ""}}
              className="rich-text mb-5 !text-2xl font-semibold !leading-[30px]  "></div>
            {/* {props.introduction && (
              <div dangerouslySetInnerHTML={{__html: props.introduction}}></div>
            )} */}
          </div>
          {props.terms &&
            props.terms.map((ele: any, id: number) => {
              const last = props.terms ? id === props.terms?.length - 1 : false
              return (
                <div
                  id={ele?.title?.replace(" ", "")}
                  className={twMerge(
                    `content border-b border-b-white py-4`,
                    last && "border-none"
                  )}
                  key={id}>
                  <h3 className="heading">
                    {sizes > 1 && id + 1}. {ele?.title}
                  </h3>
                  {ele.content && (
                    <div
                      className="rich-text"
                      dangerouslySetInnerHTML={{__html: ele.content}}></div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicy
