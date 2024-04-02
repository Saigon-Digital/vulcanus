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
import Video from "@/components/Video";
import CareersBlock from "@/components/CareersBlock";
import ChecklistBlock from "@/components/ChecklistBlock";
import CTABannerBlock from "@/components/CTABannerBlock";
import ImageContent from "@/components/ImageContent";
import CenterTitleText from "@/components/CenterTitleText";
import Form from "@/components/Form";
import BlogsBlock from "@/components/BlogsBlock";
import CertificateBlock from "@/components/CertificateBlock";
import ImagesSlide from "@/components/ImagesSlide";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export type Blocks = Exclude<
  PageBuilderFragment["dynamicBlocks"],
  null | undefined
>;
export type Block = Exclude<Blocks[number], null | undefined> & {
  blockSettings?: BlockSettingsFragment | null;
};

const blocks = new Map<Block["__typename"], React.FC<any> | any>([
  ["PageBuilderDynamicBlocksHeroBlockLayout", Hero],
  ["PageBuilderDynamicBlocksCardsBlockLayout", Cards],

  ["PageBuilderDynamicBlocksServiceBlockLayout", Service],
  ["PageBuilderDynamicBlocksTitleTextBlockLayout", HalfPageContent],
  ["PageBuilderDynamicBlocksTeamBlockLayout", Team],
  ["PageBuilderDynamicBlocksTitleBlockLayout", TitleBlock],
  ["PageBuilderDynamicBlocksPageBannerBlockLayout", PageBanner],
  ["PageBuilderDynamicBlocksImageBlockLayout", ImageBlock],
  ["PageBuilderDynamicBlocksImageTextLayout", ImageTextBlock],
  ["PageBuilderDynamicBlocksCompanyHistoryBlockLayout", CompanyHistory],

  ["PageBuilderDynamicBlocksGalleryBlockLayout", Gallery],
  ["PageBuilderDynamicBlocksIconsBlockLayout", IconsBlock],

  ["PageBuilderDynamicBlocksCareersBlockLayout", CareersBlock],
  ["PageBuilderDynamicBlocksVideoBlockLayout", Video],
  ["PageBuilderDynamicBlocksChecklistBlockLayout", ChecklistBlock],
  ["PageBuilderDynamicBlocksCtaBannerBlockLayout", CTABannerBlock],
  ["PageBuilderDynamicBlocksImageContentLayout", ImageContent],
  ["PageBuilderDynamicBlocksCenterTitleTextLayout", CenterTitleText],
  ["PageBuilderDynamicBlocksFormLayout", Form],
  ["PageBuilderDynamicBlocksBlogsLayout", BlogsBlock],
  ["PageBuilderDynamicBlocksCertificateBlockLayout", CertificateBlock],
  ["PageBuilderDynamicBlocksImagesSlideLayout", ImagesSlide],
  ["PageBuilderDynamicBlocksPrivacyPolicyLayout", PrivacyPolicy],
]);
export default blocks;
