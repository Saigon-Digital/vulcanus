import {
  BlockSettingsFragment,
  PageBuilderFragment,
} from "@/__generated__/graphql";
import Cards from "@/components/Cards";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Service from "@/components/Services";

import HalfPageContent from "@/components/HalfPageContent";
import TitleBlock from "@/components/TitleBlock";

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
  ["PageBuilderDynamicBlocksTeamBlock", Team],
  ["PageBuilderDynamicBlocksTitleBlock", TitleBlock],
]);
export default blocks;
