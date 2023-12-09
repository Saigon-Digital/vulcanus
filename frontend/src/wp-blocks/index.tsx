import {
  BlockSettingsFragment,
  PageBuilderFragment,
} from "@/__generated__/graphql";
import Cards from "@/components/Cards";
import Hero from "@/components/Hero";

export type Blocks = Exclude<
  PageBuilderFragment["dynamicBlocks"],
  null | undefined
>;
export type Block = Exclude<Blocks[number], null | undefined> & {
  blockSettings?: BlockSettingsFragment | null;
};

const blocks = new Map<Block["__typename"], React.FC<any>>([
  ["PageBuilderDynamicBlocksHeroBlock", Hero],
  ["PageBuilderDynamicBlocksCardsBlock", Cards],
]);
export default blocks;
