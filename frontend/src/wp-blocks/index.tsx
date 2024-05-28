import {
  BlockSettingsFragment,
  PageBuilderFragment,
} from "@/__generated__/graphql";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import RichText from "@/components/RichText";
// import MapCache from "map-cache"
const Cards = dynamic(() => import("@/components/Cards"), {});
const Team = dynamic(() => import("@/components/Team"), {});
const Service = dynamic(() => import("@/components/Services"), {});
const ImageBlock = dynamic(() => import("@/components/ImageBlock"), {});
const HalfPageContent = dynamic(
  () => import("@/components/HalfPageContent"),
  {}
);
const TitleBlock = dynamic(() => import("@/components/TitleBlock"), {});
const PageBanner = dynamic(() => import("@/components/PageBanner"), {});
const ImageTextBlock = dynamic(() => import("@/components/ImageTextBlock"), {});
const CompanyHistory = dynamic(() => import("@/components/CompanyHistory"), {});
const Gallery = dynamic(() => import("@/components/Gallery"), {});
const IconsBlock = dynamic(() => import("@/components/IconsBlock"), {});
const Video = dynamic(() => import("@/components/Video"), {});
const CareersBlock = dynamic(() => import("@/components/CareersBlock"), {});
const ChecklistBlock = dynamic(() => import("@/components/ChecklistBlock"), {});
const CTABannerBlock = dynamic(() => import("@/components/CTABannerBlock"), {});
const ImageContent = dynamic(() => import("@/components/ImageContent"), {});
const CenterTitleText = dynamic(
  () => import("@/components/CenterTitleText"),
  {}
);
const Form = dynamic(() => import("@/components/Form"), {});
const BlogsBlock = dynamic(() => import("@/components/BlogsBlock"), {});
const CertificateBlock = dynamic(
  () => import("@/components/CertificateBlock"),
  {}
);
const ImagesSlide = dynamic(() => import("@/components/ImagesSlide"), {});
const PrivacyPolicy = dynamic(() => import("@/components/PrivacyPolicy"), {});

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
  ["PageBuilderDynamicBlocksRichTextLayout", RichText],
]);
export default blocks;
