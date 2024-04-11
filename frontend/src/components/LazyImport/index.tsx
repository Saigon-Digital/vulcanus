import {PropsWithChildren, Suspense, useEffect, useState} from "react";

import {useRef} from "react";

const ROOT_MARGIN = 250;

function LazyImport({
  children,
  containerClass,
}: PropsWithChildren<{containerClass?: string}>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (ref.current) {
              observer.unobserve(ref.current);
              setLoad(true);
            }
          }
        });
      },
      {rootMargin: `${ROOT_MARGIN}px`}
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <Suspense fallback={<>loading</>}>
      <div className={containerClass} ref={ref}>
        {load && children}
      </div>
    </Suspense>
  );
}

export default LazyImport;
