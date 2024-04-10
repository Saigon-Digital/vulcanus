import {PropsWithChildren, useEffect, useState} from "react";

import {useRef} from "react";

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
      {rootMargin: "50px"}
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

  console.log(load);

  return <div ref={ref}>{load ? children : null}</div>;
}

export default LazyImport;
