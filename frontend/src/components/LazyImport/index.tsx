import {PropsWithChildren, useEffect, useState} from "react";

import {useRef} from "react";

const ROOT_MARGIN = 150;

function LazyImport({children}: PropsWithChildren) {
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

  if (!load) return <div ref={ref}></div>;

  return <div ref={ref}>{children}</div>;
}

export default LazyImport;
