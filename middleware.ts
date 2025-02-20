import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

// const header = {};
let locales = ["en-US", "ko-KR"];
const defaultLocale = "en-US";

function getLocale(request: NextRequest) {
  const lng = request.nextUrl.searchParams.get("lng");

  if (lng && locales.includes(lng)) {
    return lng;
  }

  const negotiator = new Negotiator({
    headers: Object.fromEntries(request.headers.entries()),
  });

  const languages = negotiator.languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lng = searchParams.get("lng");
  const explicitlyWrittenLocale = locales.some((locale) => lng === locale);

  if (explicitlyWrittenLocale) return NextResponse.next();

  const locale = getLocale(request);
  searchParams.set("lng", locale);
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: ["/", "/swap"],
};
