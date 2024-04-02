import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
export const middleware = (req: NextRequest) => {
  const nextUrl = req.nextUrl;
  if (nextUrl.pathname.startsWith("//")) {
    nextUrl.pathname.replace("//", "/");
    return NextResponse.rewrite(nextUrl);
  }
};
