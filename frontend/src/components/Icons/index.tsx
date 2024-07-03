import {twMerge} from "tailwind-merge";

type IconProps = {
  className?: string;
  w?: number;
  h?: number;
};
export const CheckIcon = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none">
      <path
        d="M16 2.00012C19.713 2.00012 23.274 3.47512 25.8995 6.10063C28.525 8.72614 30 12.2871 30 16.0001C30 19.7132 28.525 23.2741 25.8995 25.8996C23.274 28.5251 19.713 30.0001 16 30.0001C12.287 30.0001 8.72601 28.5251 6.1005 25.8996C3.475 23.2741 2 19.7132 2 16.0001C2 12.2871 3.475 8.72614 6.1005 6.10063C8.72601 3.47512 12.287 2.00012 16 2.00012ZM14.256 18.7621L11.146 15.6501C11.0345 15.5386 10.9021 15.4502 10.7565 15.3898C10.6108 15.3295 10.4547 15.2985 10.297 15.2985C10.1393 15.2985 9.9832 15.3295 9.83752 15.3898C9.69185 15.4502 9.55949 15.5386 9.448 15.6501C9.22283 15.8753 9.09633 16.1807 9.09633 16.4991C9.09633 16.8176 9.22283 17.123 9.448 17.3481L13.408 21.3081C13.5192 21.4202 13.6514 21.5091 13.7972 21.5698C13.9429 21.6305 14.0992 21.6617 14.257 21.6617C14.4148 21.6617 14.5711 21.6305 14.7168 21.5698C14.8626 21.5091 14.9948 21.4202 15.106 21.3081L23.306 13.1061C23.419 12.9951 23.5089 12.8628 23.5705 12.7169C23.6321 12.5709 23.6641 12.4142 23.6649 12.2558C23.6656 12.0974 23.635 11.9404 23.5748 11.7939C23.5145 11.6474 23.4259 11.5143 23.3139 11.4022C23.202 11.2901 23.069 11.2013 22.9225 11.1409C22.7761 11.0805 22.6191 11.0497 22.4607 11.0502C22.3023 11.0508 22.1456 11.0827 21.9996 11.1441C21.8536 11.2055 21.7212 11.2953 21.61 11.4081L14.256 18.7621Z"
        fill="#009EE0"
      />
    </svg>
  );
};

export const ShapeTopRight = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={134}
      height={75}
      viewBox="0 0 134 75"
      fill="none">
      <g clipPath="url(#clip0_682_1299)">
        <path d="M67.0049 37.75L134 75V0.5L67.0049 37.75Z" fill="#169DD9" />
        <path d="M0 0.5L67.0048 37.75V0.5H0Z" fill="#169DD9" />
        <path d="M134 0.5H67.0049V37.75L134 0.5Z" fill="#184891" />
      </g>
      <defs>
        <clipPath id="clip0_682_1299">
          <rect width={134} height={75} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const MinusIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none">
      <g clip-path="url(#clip0_618_886)">
        <path
          d="M20 0C31.0547 0 40 8.94531 40 20C40 31.0547 31.0547 40 20 40C8.94531 40 0 31.0547 0 20C0 8.94531 8.94531 0 20 0ZM20 37.5391C29.6484 37.5391 37.5 29.6484 37.5 20C37.5 10.3516 29.6484 2.5 20 2.5C10.3516 2.5 2.5 10.3516 2.5 20C2.5 29.6484 10.3516 37.5391 20 37.5391ZM18.6328 21.25H11.25C10.5469 21.25 10 20.7031 10 20C10 19.2969 10.5469 18.75 11.25 18.75H28.75C29.4531 18.75 30 19.2969 30 20C30 20.7031 29.4531 21.25 28.75 21.25H18.6328Z"
          fill="#009EE0"
        />
      </g>
      <defs>
        <clipPath id="clip0_618_886">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PlusIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none">
      <g clip-path="url(#clip0_618_893)">
        <path
          d="M20 0C8.95437 0 0 8.95437 0 20C0 31.0462 8.95437 40 20 40C31.0462 40 40 31.0462 40 20C40 8.95437 31.0462 0 20 0ZM20 37.5394C10.3506 37.5394 2.5 29.6494 2.5 19.9999C2.5 10.3505 10.3506 2.49992 20 2.49992C29.6494 2.49992 37.5 10.3506 37.5 19.9999C37.5 29.6493 29.6494 37.5394 20 37.5394ZM28.75 18.75H21.25V11.25C21.25 10.56 20.69 10 20 10C19.31 10 18.75 10.56 18.75 11.25V18.75H11.25C10.56 18.75 10 19.31 10 20C10 20.69 10.56 21.25 11.25 21.25H18.75V28.75C18.75 29.44 19.31 30 20 30C20.69 30 21.25 29.44 21.25 28.75V21.25H28.75C29.44 21.25 30 20.69 30 20C30 19.31 29.44 18.75 28.75 18.75Z"
          fill="#009EE0"
        />
      </g>
      <defs>
        <clipPath id="clip0_618_893">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ArrowRight = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={props.w}
      height={props.h}
      viewBox="0 0 24 27"
      fill="none">
      <path d="M24 13.3125L0 26.625L0 -3.8147e-06L24 13.3125Z" fill="#169DD9" />
    </svg>
  );
};

export const PhoneIcon = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none">
      <path
        d="M18 9.75H16.5C16.4994 9.15345 16.2622 8.5815 15.8403 8.15967C15.4185 7.73784 14.8466 7.5006 14.25 7.5V6C15.2442 6.00119 16.1973 6.39666 16.9003 7.09966C17.6033 7.80267 17.9988 8.7558 18 9.75Z"
        fill="#009EE0"
      />
      <path
        d="M20.9993 9.75001H19.4993C19.4977 8.35811 18.9441 7.02367 17.9598 6.03945C16.9756 5.05523 15.6412 4.50159 14.2493 4.50001V3.00001C16.0389 3.00199 17.7546 3.71379 19.0201 4.97923C20.2855 6.24467 20.9973 7.9604 20.9993 9.75001ZM15.249 16.1115L16.929 14.4315C17.1539 14.2066 17.4398 14.0526 17.7514 13.9886C18.063 13.9246 18.3864 13.9534 18.6818 14.0715L20.7278 14.8905C21.0293 15.0112 21.2878 15.2194 21.4699 15.4884C21.652 15.7573 21.7493 16.0747 21.7493 16.3995V20.1203C21.7498 20.3414 21.7052 20.5603 21.6182 20.7636C21.5312 20.9669 21.4036 21.1504 21.2432 21.3026C21.0828 21.4549 20.8931 21.5729 20.6856 21.6493C20.478 21.7257 20.2571 21.7589 20.0363 21.747C5.69478 20.8545 2.79828 8.70751 2.26053 4.05601C2.23449 3.8286 2.25688 3.59826 2.32624 3.38013C2.3956 3.16201 2.51036 2.96104 2.66296 2.79044C2.81556 2.61984 3.00255 2.48349 3.21163 2.39034C3.42071 2.29719 3.64714 2.24937 3.87603 2.25001H7.53078C7.85558 2.25 8.17294 2.3473 8.44191 2.52938C8.71088 2.71146 8.91912 2.96995 9.03978 3.27151L9.85803 5.31751C9.97612 5.61284 10.0049 5.93633 9.94096 6.24788C9.87696 6.55944 9.72296 6.84538 9.49803 7.07026L7.81803 8.75026C7.81803 8.75026 8.74953 15.2993 15.249 16.1115Z"
        fill="#009EE0"
      />
    </svg>
  );
};

export const TitleShape = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={props.w}
      height={props.h}
      viewBox="0 0 210 233"
      fill="none">
      <g clipPath="url(#clip0_591_1332)">
        <path
          d="M105.008 174.75L210 233V116.5L105.008 174.75Z"
          fill="#169DD9"
        />
        <path d="M105.008 58.25L210 116.5V0L105.008 58.25Z" fill="#169DD9" />
        <path d="M0 116.5L105.008 174.75V58.25L0 116.5Z" fill="#169DD9" />
        <path d="M210 116.5L105.008 58.25V174.75L210 116.5Z" fill="#184891" />
      </g>
      <defs>
        <clipPath id="clip0_591_1332">
          <rect width={210} height={233} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const PlayIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      viewBox="0 0 100 100"
      fill="none">
      <path
        d="M50 0C63.2608 0 75.9785 5.26784 85.3553 14.6447C94.7322 24.0215 100 36.7392 100 50C100 63.2608 94.7322 75.9785 85.3553 85.3553C75.9785 94.7322 63.2608 100 50 100C36.7392 100 24.0215 94.7322 14.6447 85.3553C5.26784 75.9785 0 63.2608 0 50C0 36.7392 5.26784 24.0215 14.6447 14.6447C24.0215 5.26784 36.7392 0 50 0ZM9.375 50C9.375 60.7744 13.6551 71.1076 21.2738 78.7262C28.8925 86.3449 39.2256 90.625 50 90.625C60.7744 90.625 71.1076 86.3449 78.7262 78.7262C86.3449 71.1076 90.625 60.7744 90.625 50C90.625 39.2256 86.3449 28.8925 78.7262 21.2738C71.1076 13.6551 60.7744 9.375 50 9.375C39.2256 9.375 28.8925 13.6551 21.2738 21.2738C13.6551 28.8925 9.375 39.2256 9.375 50ZM39.8688 32.6688L66.5187 48.6625C66.7491 48.8016 66.9396 48.9978 67.0718 49.2321C67.204 49.4664 67.2735 49.7309 67.2735 50C67.2735 50.2691 67.204 50.5336 67.0718 50.7679C66.9396 51.0022 66.7491 51.1984 66.5187 51.3375L39.8688 67.3312C39.6318 67.474 39.3611 67.5513 39.0845 67.5552C38.8079 67.5591 38.5352 67.4894 38.2943 67.3534C38.0533 67.2174 37.8529 67.0198 37.7133 66.781C37.5738 66.5421 37.5002 66.2704 37.5 65.9938V34.0125C37.4991 33.7353 37.5719 33.4629 37.711 33.2231C37.8501 32.9833 38.0504 32.7849 38.2915 32.6481C38.5326 32.5113 38.8058 32.4412 39.0829 32.4448C39.3601 32.4484 39.6313 32.5257 39.8688 32.6688Z"
        fill="white"
      />
    </svg>
  );
};
export const MailIcon = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none">
      <path
        d="M22 8.608V16.75C22.0001 17.5801 21.6824 18.3788 21.1123 18.9822C20.5422 19.5856 19.7628 19.948 18.934 19.995L18.75 20H5.25C4.41986 20.0001 3.62117 19.6824 3.01777 19.1123C2.41437 18.5422 2.052 17.7628 2.005 16.934L2 16.75V8.608L11.652 13.664C11.7594 13.7202 11.8788 13.7496 12 13.7496C12.1212 13.7496 12.2406 13.7202 12.348 13.664L22 8.608ZM5.25 4H18.75C19.5556 3.9999 20.3325 4.299 20.93 4.83927C21.5276 5.37954 21.9032 6.12248 21.984 6.924L12 12.154L2.016 6.924C2.09352 6.15431 2.44305 5.43752 3.00175 4.90246C3.56045 4.36741 4.29168 4.04919 5.064 4.005L5.25 4H18.75H5.25Z"
        fill="#009EE0"
      />
    </svg>
  );
};

export const FaceBookIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none">
      <g clipPath="url(#clip0_2490_1270)">
        <path
          d="M40 20.0501C40 8.98246 31.04 0 20 0C8.96 0 0 8.98246 0 20.0501C0 29.7544 6.88 37.8346 16 39.6992V26.0652H12V20.0501H16V15.0376C16 11.1679 19.14 8.02005 23 8.02005H28V14.0351H24C22.9 14.0351 22 14.9373 22 16.0401V20.0501H28V26.0652H22V40C32.1 38.9975 40 30.4561 40 20.0501Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2490_1270">
          <rect width={40} height={40} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const XIcon = ({className}: any) => {
  return (
    <svg
      className={twMerge("text-white", className)}
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none">
      <path
        d="M21 7L7 21"
        stroke="currentcolor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7L21 21"
        stroke="currentcolor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const InstagramIcon = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none">
      <path
        d="M19.9949 13.664C16.5061 13.664 13.659 16.5111 13.659 20C13.659 23.4889 16.5061 26.336 19.9949 26.336C23.4837 26.336 26.3308 23.4889 26.3308 20C26.3308 16.5111 23.4837 13.664 19.9949 13.664ZM38.9979 20C38.9979 17.3762 39.0216 14.7762 38.8743 12.1572C38.727 9.11515 38.033 6.41532 35.8085 4.19082C33.5793 1.96156 30.8843 1.27235 27.8423 1.125C25.2186 0.977648 22.6186 1.00141 19.9996 1.00141C17.3759 1.00141 14.776 0.977648 12.157 1.125C9.115 1.27235 6.41522 1.96632 4.19076 4.19082C1.96154 6.42007 1.27234 9.11515 1.12499 12.1572C0.977648 14.781 1.00141 17.381 1.00141 20C1.00141 22.619 0.977648 25.2238 1.12499 27.8428C1.27234 30.8849 1.9663 33.5847 4.19076 35.8092C6.41997 38.0384 9.115 38.7277 12.157 38.875C14.7807 39.0224 17.3807 38.9986 19.9996 38.9986C22.6234 38.9986 25.2233 39.0224 27.8423 38.875C30.8843 38.7277 33.5841 38.0337 35.8085 35.8092C38.0378 33.5799 38.727 30.8849 38.8743 27.8428C39.0264 25.2238 38.9979 22.6238 38.9979 20ZM19.9949 29.7488C14.6001 29.7488 10.2462 25.3949 10.2462 20C10.2462 14.6051 14.6001 10.2512 19.9949 10.2512C25.3897 10.2512 29.7435 14.6051 29.7435 20C29.7435 25.3949 25.3897 29.7488 19.9949 29.7488ZM30.1428 12.1287C28.8832 12.1287 27.8661 11.1115 27.8661 9.85189C27.8661 8.59229 28.8832 7.57511 30.1428 7.57511C31.4024 7.57511 32.4196 8.59229 32.4196 9.85189C32.4199 10.151 32.3613 10.4472 32.247 10.7236C32.1327 11 31.965 11.2512 31.7535 11.4627C31.5421 11.6742 31.2909 11.8419 31.0145 11.9561C30.7381 12.0704 30.4419 12.1291 30.1428 12.1287Z"
        fill="white"
      />
    </svg>
  );
};

export const Xing = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40ZM10.25 16.625V30H14.5V16.625H10.25ZM10 12.375C10 13.75 11 14.75 12.375 14.75C13.75 14.75 14.75 13.75 14.75 12.375C14.75 11 13.75 10 12.375 10C11.125 10 10 11 10 12.375ZM25.75 30H29.75V21.75C29.75 17.625 27.25 16.25 24.875 16.25C22.75 16.25 21.25 17.625 20.875 18.5V16.625H16.875V30H21.125V22.875C21.125 21 22.375 20 23.625 20C24.875 20 25.75 20.625 25.75 22.75V30Z"
        fill="white"
      />
    </svg>
  );
};
export const LinkedInIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40ZM10.25 16.625V30H14.5V16.625H10.25ZM10 12.375C10 13.75 11 14.75 12.375 14.75C13.75 14.75 14.75 13.75 14.75 12.375C14.75 11 13.75 10 12.375 10C11.125 10 10 11 10 12.375ZM25.75 30H29.75V21.75C29.75 17.625 27.25 16.25 24.875 16.25C22.75 16.25 21.25 17.625 20.875 18.5V16.625H16.875V30H21.125V22.875C21.125 21 22.375 20 23.625 20C24.875 20 25.75 20.625 25.75 22.75V30Z"
        fill="white"
      />
    </svg>
  );
};

export const LocationIcon = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none">
      <path
        d="M13.734 21.816C16.3485 19.515 21 14.814 21 10.5C21 8.11305 20.0518 5.82387 18.364 4.13604C16.6761 2.44821 14.3869 1.5 12 1.5C9.61305 1.5 7.32387 2.44821 5.63604 4.13604C3.94821 5.82387 3 8.11305 3 10.5C3 14.814 7.65 19.515 10.266 21.816C10.7432 22.2419 11.3604 22.4773 12 22.4773C12.6396 22.4773 13.2568 22.2419 13.734 21.816ZM9 10.5C9 9.70435 9.31607 8.94129 9.87868 8.37868C10.4413 7.81607 11.2044 7.5 12 7.5C12.7956 7.5 13.5587 7.81607 14.1213 8.37868C14.6839 8.94129 15 9.70435 15 10.5C15 11.2956 14.6839 12.0587 14.1213 12.6213C13.5587 13.1839 12.7956 13.5 12 13.5C11.2044 13.5 10.4413 13.1839 9.87868 12.6213C9.31607 12.0587 9 11.2956 9 10.5Z"
        fill="#009EE0"
      />
    </svg>
  );
};

export const ButtonNext = (props: IconProps) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={23}
      viewBox="0 0 22 23"
      fill="none">
      <path
        d="M11.0256 14.354L12.4396 15.769L16.6826 11.526L12.4396 7.28296L11.0256 8.69696L12.8536 10.526L5.31662 10.526L5.31662 12.526L12.8536 12.526L11.0256 14.354Z"
        fill="currentcolor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0.499999C2.93913 0.499999 1.92172 0.921427 1.17157 1.67157C0.421429 2.42172 -1.28474e-07 3.43913 -1.74846e-07 4.5L-7.86805e-07 18.5C-8.33177e-07 19.5609 0.421428 20.5783 1.17157 21.3284C1.92172 22.0786 2.93913 22.5 4 22.5L18 22.5C19.0609 22.5 20.0783 22.0786 20.8284 21.3284C21.5786 20.5783 22 19.5609 22 18.5L22 4.5C22 3.43913 21.5786 2.42172 20.8284 1.67157C20.0783 0.921427 19.0609 0.5 18 0.5L4 0.499999ZM2 4.5L2 18.5C2 19.0304 2.21071 19.5391 2.58579 19.9142C2.96086 20.2893 3.46957 20.5 4 20.5L18 20.5C18.5304 20.5 19.0391 20.2893 19.4142 19.9142C19.7893 19.5391 20 19.0304 20 18.5L20 4.5C20 3.96957 19.7893 3.46086 19.4142 3.08579C19.0391 2.71071 18.5304 2.5 18 2.5L4 2.5C3.46957 2.5 2.96086 2.71071 2.58579 3.08579C2.21071 3.46086 2 3.96957 2 4.5Z"
        fill="currentcolor"
      />
    </svg>
  );
};
