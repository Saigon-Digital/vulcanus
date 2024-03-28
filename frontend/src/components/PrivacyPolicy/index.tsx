import {PrivacyPolicyFragment} from "@/__generated__/graphql";
import * as React from "react";
import parse from "html-react-parser";
import clsx from "clsx";
import {useState} from "react";
import {languages} from "@/utils/language";
import {useRouter} from "next/router";
function PrivacyPolicy(props: PrivacyPolicyFragment) {
  const [active, setActive] = useState(0);
  const router = useRouter();
  React.useEffect(() => {
    if (typeof document === undefined) return;
    const id =
      //@ts-ignore
      props.terms
        ?.find((ele, id) => (id !== 0 ? id === active : ""))
        ?.title?.replace(" ", "") || "";
    const element = document.getElementById(id);
    if (element) {
      element?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
  }, [active]);
  return (
    <section className="container-block introduce-block py-28 ">
      <div className="grid grid-cols-12 gap-y-10 px-5">
        <div className="col-span-full flex flex-wrap gap-4 md:col-span-4 md:flex-col lg:col-span-2 lg:col-start-3">
          <div className="flex flex-col gap-3 border-l-2 border-dashed border-primary-blue-main/40 pl-6">
            <p>{languages(router.locale)?.introduce}</p>
            <ul className="list-decimal pl-5">
              {props.terms?.map((ele: any, id: number) => {
                let size = props.terms ? props.terms.length - 1 : 0;
                return (
                  <li
                    key={id}
                    className={clsx(
                      `relative cursor-pointer font-normal`,
                      active === id &&
                        "font-semibold text-primary-blue-main after:absolute after:-left-[46px] after:top-0 after:h-5 after:w-[2px] after:border-l-2 after:border-primary-blue-main",
                      id === size ? "-mb-2" : "mb-3"
                    )}>
                    <button onClick={(e) => setActive(id)}>{ele?.title}</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="content col-span-full flex flex-col md:col-span-7 lg:col-span-5">
          <div className="border-b border-white pb-4">
            <h1 className="mb-5 text-[32px] leading-[40px]">
              {languages(router.locale)?.policy}
            </h1>
            <h2 className="mb-5 !text-2xl font-semibold !leading-[30px] text-secondary-yellow ">
              {languages(router.locale)?.introduce}
            </h2>
            {props.introduction && parse(props.introduction)}
          </div>
          {props.terms &&
            props.terms.map((ele: any, id: number) => {
              const last = props.terms ? id === props.terms?.length - 1 : false;
              return (
                <div
                  id={ele?.title?.replace(" ", "")}
                  className={clsx(
                    `content border-b border-b-white py-4`,
                    last && "border-none"
                  )}
                  key={id}>
                  <h3 className="heading">
                    {id + 1}. {ele?.title}
                  </h3>
                  {ele?.content && parse(ele.content || "")}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
