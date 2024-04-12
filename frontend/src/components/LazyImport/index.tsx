import {PropsWithChildren, Suspense, useEffect, useState} from "react";
import {m} from "framer-motion";
const ROOT_MARGIN = 250;

function LazyImport({
  children,
  className,
  rootMargin,
}: PropsWithChildren<{className?: string; rootMargin?: number}>) {
  const [load, setLoad] = useState(false);

  return (
    <Suspense fallback={<>loading</>}>
      <m.div
        onViewportEnter={(entry) => {
          setLoad(true);
        }}
        viewport={{margin: `${rootMargin || ROOT_MARGIN}px`}}
        className={"lazy-import " + className}>
        {load && children}
      </m.div>
    </Suspense>
  );
}

export default LazyImport;
