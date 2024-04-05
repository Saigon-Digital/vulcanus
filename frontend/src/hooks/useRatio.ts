import {ImagesSLideFragment} from "@/__generated__/graphql";
import {useState, useLayoutEffect} from "react";

export const useRatio = (slide: any) => {
  const [slideWithRatio, setSlideWithRatio] = useState<any[]>([]);
  const [ratio, setRatio] = useState<number>(0);
  const getImageAspectRatio = function (
    imageSrc: string,
    callback: (w: number, h: number) => void
  ) {
    var img = document.createElement("img");
    img.onload = () => {
      var w = img.naturalWidth;
      var h = img.naturalHeight;
      callback(w, h);
    };
    img.src = imageSrc;
  };
  const getRatio = (s: any) => {
    let result: any[] = [];

    getImageAspectRatio(s?.image?.node.sourceUrl || "", async (w, h) => {
      let ratio = w / h;
      setRatio(ratio);
    });
  };

  useLayoutEffect(() => {
    if (typeof document !== undefined) {
      getRatio(slide);
    }
  }, [slide]);

  return ratio !== 0 ? ratio : null;
};
