import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

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

  if (explicitlyWrittenLocale) {
    const response = NextResponse.next();
    response.headers.set("x-Locale", lng!);
    return response;
  }

  const locale = getLocale(request);
  searchParams.set("lng", locale);

  const response = NextResponse.rewrite(request.nextUrl);
  response.headers.set("x-Locale", locale);
  return response;
}

export const config = {
  matcher: ["/", "/swap"],
};
