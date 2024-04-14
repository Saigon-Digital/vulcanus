import {PageBannerFragment} from "@/__generated__/graphql";
import useImageStyle from "@/hooks/useImageCss";
import {useWindowSize} from "usehooks-ts";
const PageBanner: React.FC<PageBannerFragment> = ({
  title,
  description,
  image,
}) => {
  const {width} = useWindowSize();
  const fixedWidth = width > 1900 ? 1900 : width;

  const imageStyle = useImageStyle({
    src: image?.node.sourceUrl || "",
    w: fixedWidth,

    h: fixedWidth * 0.666,
    priority: true,
    alt: "page banner",
  });
  return (
    <div className="container-fluid pb-10 lg:pb-16">
      <div className="flex flex-wrap items-center justify-between gap-y-5 py-10 ">
        {title && (
          <h1 className="text-4xl font-bold text-white lg:text-5xl 2xl:text-[64px] 2xl:leading-[89px]">
            {title}
          </h1>
        )}
        {description && (
          <div
            dangerouslySetInnerHTML={{__html: description}}
            className="w-full text-lg font-[300] md:w-1/2 md:text-xl [&>*>strong]:font-medium xl:[&>*]:text-xl"></div>
        )}
      </div>
      {image && (
        <div
          style={{
            backgroundImage: imageStyle,
          }}
          className="parallax relative aspect-[4/3] max-h-[600px] w-full object-cover lg:aspect-[2/1] xl:aspect-[1800/850]"></div>
      )}
    </div>
  );
};

export default PageBanner;
