import {VideoBlock} from "@/__generated__/graphql";
import LazyImport from "../LazyImport";
import dynamic from "next/dynamic";
const PlayIcon = dynamic(() => import("../Icons").then((mod) => mod.PlayIcon));
const ReactPlayer = dynamic(() => import("react-player"));
const index: React.FC<VideoBlock> = (props) => {
  return (
    <div className="container-fluid py-20">
      <LazyImport>
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
      </LazyImport>
    </div>
  );
};

export default index;
