import {
  BlockSettingsFragment,
  PageBuilderFragment,
} from "@/__generated__/graphql";
import Cards from "@/components/Cards";
import Hero from "@/components/Hero";

import Service from "@/components/Services";

import HalfPageContent from "@/components/HalfPageContent";


export type Blocks = Exclude<
  PageBuilderFragment["dynamicBlocks"],
  null | undefined
>;
export type Block = Exclude<Blocks[number], null | undefined> & {
  blockSettings?: BlockSettingsFragment | null;
};

const blocks = new Map<Block["__typename"], React.FC<any> | any>([
  ["PageBuilderDynamicBlocksHeroBlock", Hero],
  ["PageBuilderDynamicBlocksCardsBlock", Cards],

  ["PageBuilderDynamicBlocksServiceBlock", Service],

  ["PageBuilderDynamicBlocksTitleTextBlock", HalfPageContent],

]);
export default blocks;
