import {BlockSettingsFragment} from "@/__generated__/graphql";
import React, {PropsWithChildren} from "react";
type Props = PropsWithChildren &
  React.HTMLAttributes<HTMLElement> & {
    blockSettings: BlockSettingsFragment | null | undefined;
  };

const BlockWrapper = ({children, blockSettings, ...props}: Props) => {
  return (
    <section {...props}>
      {children}
      <style jsx>{`
        section {
          --padding-top: ${blockSettings?.spacing?.mobile?.top || 0}px;
          --padding-bottom: ${blockSettings?.spacing?.mobile?.bottom || 0}px;
          --display: ${blockSettings?.visibility?.showOnMobile === false
            ? "none"
            : "block"};
          padding-top: var(--padding-top);
          padding-bottom: var(--padding-bottom);
          display: var(--display);
        }
        @media (min-width: 1024px) {
          section {
            --padding-top: ${blockSettings?.spacing?.desktop?.top || 0}px;
            --padding-bottom: ${blockSettings?.spacing?.desktop?.bottom || 0}px;
            --display: ${blockSettings?.visibility?.showOnDesktop === false
              ? "none"
              : "block"};
          }
        }
      `}</style>
    </section>
  );
};

export default BlockWrapper;
