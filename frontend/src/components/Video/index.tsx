import {VideoBlock} from "@/__generated__/graphql";

import dynamic from "next/dynamic";

import {motion} from "framer-motion";
const PlayIcon = dynamic(() => import("../Icons").then((mod) => mod.PlayIcon));
const ReactPlayer = dynamic(() => import("react-player"));

const Video: React.FC<VideoBlock> = (props) => {
  return (
    <motion.div
      viewport={{margin: "200px"}}
      className="container-fluid py-8  text-center sm:py-14 lg:py-20">
      <h3 className="mb-10 text-center text-3xl font-bold text-white xl:text-5xl">
        {props.title}
      </h3>

      <ReactPlayer
        width="100%"
        height="auto"
        playIcon={<PlayIcon />}
        controls
        light={
          props.thumbnailImage?.node.sourceUrl || "/images/video-thumb.png"
        }
        config={{
          vimeo: {
            playerOptions: {
              autoplay: true,
              controls: true,
              quality: "720p",
              vimeo_logo: false,
              play_button_position: "center",
            },
          },
        }}
        style={{
          width: "100%",
          maxWidth: "900px",

          aspectRatio: "1860/1080",
          marginLeft: "auto",
          marginRight: "auto",
          objectFit: "cover",
        }}
        url={props.videoLink?.url || ""}
      />
    </motion.div>
  );
};

export default Video;
