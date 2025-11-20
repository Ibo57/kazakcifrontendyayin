import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "tr"

// List of supported country codes (manually configured)
// Update this list based on your Medusa regions
const SUPPORTED_COUNTRIES = ["tr", "us", "gb", "de", "fr"]

/**
 * Gets country code from request
 */
function getCountryCode(request: NextRequest): string {
  const vercelCountryCode = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase()

  const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

  // Priority: URL > Vercel Header > Default
  if (urlCountryCode && SUPPORTED_COUNTRIES.includes(urlCountryCode)) {
    return urlCountryCode
  } else if (vercelCountryCode && SUPPORTED_COUNTRIES.includes(vercelCountryCode)) {
    return vercelCountryCode
  }

  return DEFAULT_REGION
}

/**
 * Middleware to handle region selection
 */
export async function middleware(request: NextRequest) {
  const cacheIdCookie = request.cookies.get("_medusa_cache_id")
  const cacheId = cacheIdCookie?.value || crypto.randomUUID()

  const countryCode = getCountryCode(request)
  const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()
  const urlHasCountryCode = SUPPORTED_COUNTRIES.includes(urlCountryCode || "")

  // If one of the country codes is in the url and the cache id is set, return next
  if (urlHasCountryCode && cacheIdCookie) {
    return NextResponse.next()
  }

  // If one of the country codes is in the url and the cache id is not set, set the cache id and continue
  if (urlHasCountryCode && !cacheIdCookie) {
    const nextResponse = NextResponse.next()
    nextResponse.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })
    return nextResponse
  }

  // Check if the url is a static asset
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  const redirectPath =
    request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname
  const queryString = request.nextUrl.search ? request.nextUrl.search : ""

  // If no country code is set, we redirect to the relevant region
  if (!urlHasCountryCode) {
    const redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
    const response = NextResponse.redirect(redirectUrl, 307)
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
