import {PropsWithChildren} from "react";

import LazyLoad from "react-lazyload";

const ROOT_MARGIN = 250;

function LazyImport({
  children,
  className,
  rootMargin,
}: PropsWithChildren<{className?: string; rootMargin?: number}>) {
  return (
    <LazyLoad
      offset={rootMargin || ROOT_MARGIN}
      className={"lazy-import " + className}>
      {children}
    </LazyLoad>
  );
}

export default LazyImport;
