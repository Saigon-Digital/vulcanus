import {
  BlockSettingsFragment,
  PageBuilderFragment,
} from "@/__generated__/graphql";
import Cards from "@/components/Cards";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Service from "@/components/Services";
import ImageBlock from "@/components/ImageBlock";
import HalfPageContent from "@/components/HalfPageContent";
import TitleBlock from "@/components/TitleBlock";
import PageBanner from "@/components/PageBanner";
import ImageTextBlock from "@/components/ImageTextBlock";
import CompanyHistory from "@/components/CompanyHistory";
import Gallery from "@/components/Gallery/index";
import IconsBlock from "@/components/IconsBlock";
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
  ["PageBuilderDynamicBlocksPageBannerBlock", PageBanner],
  ["PageBuilderDynamicBlocksImageBlock", ImageBlock],
  ["PageBuilderDynamicBlocksImageText", ImageTextBlock],
  ["PageBuilderDynamicBlocksCompanyHistoryBlock", CompanyHistory],
  ["PageBuilderDynamicBlocksGalleryBlock", Gallery],
  ["PageBuilderDynamicBlocksIconsBlock", IconsBlock],
]);
export default blocks;
