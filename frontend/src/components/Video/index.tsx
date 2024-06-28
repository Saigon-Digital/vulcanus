import {VideoBlock} from "@/__generated__/graphql";

import dynamic from "next/dynamic";
import {useState} from "react";
import {m} from "framer-motion";
const PlayIcon = dynamic(() => import("../Icons").then((mod) => mod.PlayIcon));
const ReactPlayer = dynamic(() => import("react-player"));

const Video: React.FC<VideoBlock> = (props) => {
  return (
    <m.div
      viewport={{margin: "200px"}}
      className="container-fluid py-20 text-center">
      <h3 className="mb-10 text-center text-3xl font-bold text-white xl:text-5xl">
        {props.title}
      </h3>

      <ReactPlayer
        width="90%"
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
    </m.div>
  );
};

export default Video;
