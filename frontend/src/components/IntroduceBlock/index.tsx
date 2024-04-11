import React, {useEffect, useState} from "react";

import {useQuery} from "@apollo/client";
import {LanguageCodeEnum} from "@/__generated__/graphql";
import {getPageType} from "@/libs/graphql/utils";
import {useRouter} from "next/router";

import {INTRODUCE_PAGE} from "@/constant";
import Link from "next/link";

type Props = {
  content?: string | null | undefined;
  language?: LanguageCodeEnum;
  pathname?: string;
};

const IntroduceBlock = (props: Props) => {
  return (
    <section className="container-block introduce-block py-28 ">
      <div className="grid grid-cols-12 gap-y-10 px-5">
        <div className="col-span-full flex flex-wrap gap-4 md:col-span-4 md:flex-col lg:col-span-2 lg:col-start-3">
          <p>Introduce</p>
          {/* {pages.length > 0 && (
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
          )} */}
        </div>
        {props.content && (
          <div
            dangerouslySetInnerHTML={{__html: props.content}}
            className="content col-span-full md:col-span-7 lg:col-span-5"></div>
        )}
      </div>
    </section>
  );
};

export default IntroduceBlock;
