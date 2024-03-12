import React, {useEffect, useState} from "react";
import parse from "html-react-parser";
import {useQuery} from "@apollo/client";
import {LanguageCodeEnum} from "@/__generated__/graphql";
import {getPageType} from "@/libs/graphql/utils";
import {useRouter} from "next/router";

import {INTRODUCE_PAGE} from "@/constant";
import Link from "next/link";

type Props = {
  content?: string | null | undefined;
  language: LanguageCodeEnum;
  pathname?: string;
};

const IntroduceBlock = (props: Props) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getPagesTypeAsync();
  }, []);

  const getPagesTypeAsync = async () => {
    const {data} = await getPageType(props.language);
    if (!data.pages) return;

    const introducePages = data.pages?.nodes?.filter((ele: any) => {
      //   console.log(ele);
      const {pageType} = ele;
      //   console.log(pageType.nodes);
      if (pageType.nodes.length > 0)
        return (
          pageType?.nodes?.find((ele: any) => ele.name === INTRODUCE_PAGE) !==
          undefined
        );
      return false;
    });

    setPages(introducePages);
  };
  return (
    <section className="container-block introduce-block py-28 ">
      <div className="grid grid-cols-12">
        <div className="col-span-full flex flex-wrap gap-4 md:col-span-4 md:flex-col lg:col-span-2 lg:col-start-3">
          <p>Introduce</p>
          {pages.length > 0 && (
            <ul className="">
              {pages.map((ele: any, id) => {
                return (
                  <li key={id}>
                    <Link
                      className={`${
                        props.pathname === ele.uri &&
                        "text-primary-blue-main marker:text-primary-blue-main"
                      }`}
                      href={ele.uri}>
                      {id + 1}. {ele.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="content col-span-full md:col-span-5">
          {props.content && parse(props.content || "")}
        </div>
      </div>
    </section>
  );
};

export default IntroduceBlock;
