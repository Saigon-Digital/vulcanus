import {PageBannerFragment} from "@/__generated__/graphql";
import useImageStyle from "@/hooks/useImageCss";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import Image from "next/image";
import {useMemo} from "react";
import ReactPlayer from "react-player";

const PageBanner: React.FC<PageBannerFragment> = ({
  title,
  description,
  image,
  videoLink,
  videoOrImage,
}) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const imageStyle = useImageStyle({
    src: image?.node.sourceUrl || "",
    w: 1800,

    h: 900,
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
            className="w-full text-lg font-[300] md:w-1/2 md:text-xl [&>*>strong]:font-semibold xl:[&>*]:text-xl"></div>
        )}
      </div>
      {videoOrImage?.at(0) === "video" ? (
        <div className="parallax relative mx-auto aspect-[4/3] max-h-[600px] w-full object-cover lg:aspect-[2/1] xl:aspect-[1800/850] xl:w-4/5">
          <ReactPlayer
            width="100%"
            height="auto"
            controls
            config={{
              vimeo: {
                playerOptions: {
                  autoplay: true,
                  loop: true,
                  controls: true,
                  vimeo_logo: false,
                  play_button_position: "center",
                },
              },
            }}
            style={{
              width: "100%",
              background: "transparent",
              aspectRatio: "1800/850",
              borderRadius: "10px",
              overflow: "hidden",
            }}
            className="relative z-20 translate-x-3 overflow-hidden rounded-md "
            url={videoLink?.url || ""}
          />
        </div>
      ) : (
        image &&
        (!isMobile ? (
          <div
            style={{
              backgroundImage: imageStyle,
            }}
            className="parallax relative aspect-[4/3] max-h-[600px] w-full object-cover lg:aspect-[2/1] xl:aspect-[1800/850]"></div>
        ) : (
          <div className="parallax relative aspect-[4/3] max-h-[600px] w-full object-cover lg:aspect-[2/1] xl:aspect-[1800/850]">
            <Image
              fill
              sizes="80vw"
              alt="banner image"
              className="object-cover"
              src={image.node.sourceUrl || ""}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default PageBanner;
