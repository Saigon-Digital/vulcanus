import {IconsBlock} from "@/__generated__/graphql";
import Image from "next/image";
import Button from "../Button";
import {getAcfLinkProps} from "@/utils";
const index: React.FC<IconsBlock> = (props) => {
  return (
    <div className="container-fluid py-16 lg:py-20 xl:py-28 ">
      {props.preHeader && (
        <p className="font-semiborder-l-primary-midBlue-100 mb-3 text-xl text-primary-blue-main lg:text-2xl ">
          {props.preHeader}
        </p>
      )}
      <div className="grid grid-cols-12 gap-y-10">
        <div className="col-span-full flex flex-col items-center  gap-4 text-center md:col-span-5  md:items-start md:pr-4 md:text-left 2xl:col-span-4">
          {props.header && (
            <h2 className="text-3xl font-bold lg:text-5xl lg:leading-[67px]">
              {props.header}
            </h2>
          )}
          {props.description && (
            <p className=" max-w-[650px]  font-light  lg:text-lg">
              {props.description}
            </p>
          )}
          {props.ctaLink && (
            <Button
              className="mt-5 max-w-[250px]"
              href={props.ctaLink.ctaLink?.url || ""}>
              {props.ctaLink?.ctaText}
            </Button>
          )}
        </div>
        <div className="grid-col-1 col-span-full grid gap-y-10  md:col-span-7 md:grid-cols-2 lg:col-span-6 2xl:col-start-7">
          {props.icons &&
            props.icons?.map((ele, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 text-center md:w-4/5 md:items-start md:text-left">
                  <Image
                    width={80}
                    height={80}
                    src={ele?.iconImage?.node.sourceUrl || ""}
                    alt="icon"
                    className=""
                  />
                  <h3 className="max-w-[250px] text-2xl font-semibold">
                    {ele?.iconTitle}
                  </h3>
                  {ele?.iconDescription && (
                    <p
                      className="max-w-[450px] text-lg font-[300] [&>*>p]:font-bold "
                      dangerouslySetInnerHTML={{
                        __html: ele.iconDescription,
                      }}></p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default index;
