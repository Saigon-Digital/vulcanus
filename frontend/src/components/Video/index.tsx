import React from "react";
import {VideoBlock} from "@/__generated__/graphql";
import ReactPlayer from "react-player";
import {PlayIcon} from "../Icons";
const index: React.FC<VideoBlock> = (props) => {
  return (
    <div className="container-fluid py-20">
      <ReactPlayer
        width="100%"
        height="auto"
        playIcon={<PlayIcon />}
        controls
        light
        config={{
          vimeo: {
            playerOptions: {
              autoplay: true,
              controls: true,
              vimeo_logo: false,
              play_button_position: "center",
            },
          },
        }}
        style={{width: "100%", aspectRatio: "1860/1080"}}
        url={props.videoLink?.url || ""}
      />
      {/* {props.videoLink?.url && (
        <iframe
          width="100%"
          height="100%"
          className="aspect-[1860/1080] w-full">
          <source src={"https://vimeo.com/914735196"} type="video/mp4" />
          <source src={"https://vimeo.com/914735196"} type="video/webm" />
        </iframe>
      )} */}
    </div>
  );
};

export default index;
