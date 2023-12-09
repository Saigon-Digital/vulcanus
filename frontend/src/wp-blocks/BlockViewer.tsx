import blocks, {Block} from ".";
import BlockWrapper from "./BlockWrapper";

type BlockViewerProps = {
  dynamicBlocks: Array<Block | null | undefined> | null | undefined;
  customRenderers?: Map<Block["__typename"], (props: Block) => JSX.Element>;
};

function BlockViewer({dynamicBlocks, customRenderers}: BlockViewerProps) {
  return (
    <>
      {dynamicBlocks?.map((block, index) => {
        if (!block?.__typename) {
          return null;
        }
        const customRenderer = customRenderers?.get(block.__typename);
        const Component = blocks.get(block.__typename);
        return (
          <BlockWrapper
            key={`${block.__typename}_${index}`}
            data-block-type={block?.__typename}
            blockSettings={block?.blockSettings}>
            {customRenderer ? (
              customRenderer(block)
            ) : Component ? (
              <Component {...block} />
            ) : null}
          </BlockWrapper>
        );
      })}
    </>
  );
}

export default BlockViewer;
