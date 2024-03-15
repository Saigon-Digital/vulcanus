import React from "react";
import {VideoBlock} from "@/__generated__/graphql";
import ReactPlayer from "react-player";
const index: React.FC<VideoBlock> = (props) => {
  return (
    <div className="container-fluid py-20">
      <ReactPlayer
        width="100%"
        height="auto"
        config={{
          vimeo: {
            playerOptions: {
              autoplay: false,
              controls: true,
            },
          },
        }}
        style={{width: "100%", aspectRatio: "1860/1080"}}
        url={props.videoLink?.url || ""}
      />
      {/* {props.videoLink?.url && (
        <iframe width="100%" height="100%" className="aspect-[1860/1080] w-full">
          <source src={props.videoLink?.url} type="video/mp4" />
          <source src={props.videoLink?.url} type="video/webm" />
        </iframe>
      )} */}
    </div>
  );
};

export default index;
