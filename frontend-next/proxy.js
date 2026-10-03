import { NextResponse } from "next/server";

const canonicalPathRedirects = new Map([
  ["/Apparel-and-Accessories/Aprons", "/apparel-and-accessories/aprons"],
  ["/Apparel-and-Accessories/aprons", "/apparel-and-accessories/aprons"],
  ["/Apparel-and-Accessories/Caps", "/apparel-and-accessories/caps"],
  ["/Apparel-and-Accessories/Sipper", "/drink-ware/sipper"],
  ["/Apparel-and-Accessories/promotional-clocks", "/collection/promotional-clocks"],
  ["/Apparel-and-Accessories/duffle-bags", "/bags-and-travel/duffle-bags"],
  ["/Apparel-and-Accessories/wireless-charging", "/technology-accessories/wireless-charging"],
  ["/Apparel-and-Accessories/file-and-folder", "/office-and-writing/file-and-folder"],
  ["/office-and-writing/notebook-and-diary", "/office-and-writing/notebooks-and-diary-sets"],
  ["/categories/Drink%20Ware", "/drink-ware"],
  ["/employee-gifts", "/collection/welcome-kits"],
  ["/Technology%20Accessories", "/technology-accessories"],
  ["/privacy", "/privacy-policy"],
  ["/blog", "/blogs"],
  ["/festival-gifts", "/diwali-special"],
  ["/collection/__CANONICAL__", "/collection"],
  ["/apparel-and-accessories/polo-t-shirts/__CANONICAL__", "/apparel-and-accessories/polo-t-shirts"],
  ["/apparel-and-accessories/polo-t-shirts/promotional-collar%20-t-shirts", "/apparel-and-accessories/polo-t-shirts/promotional-collar-t-shirts"],
  ["/drink-ware/ceramic-mug/classic-ceramic-coffee-mug", "/drink-ware/ceramic-mug/classic-ceramic-coffee-mug-2"],
]);

const canonicalPrefixRedirects = [
  ["/drink-ware/steel%20mug", "/drink-ware/steel-mug"],
  ["/drink-ware/coffee-mug/double%20wall%20insulated%20mug", "/drink-ware/coffee-mug/double-wall-insulated-mug"],
];

const recoverableProductPrefixes = [
  "/bags-and-travel/backpacks/economy-corporate-backpack",
  "/eco-products/cork-laptop-bag-and-wallet/cork-wallet-for-men",
];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const corruptedProductPath = recoverableProductPrefixes.find(
    (canonicalPath) => {
      if (!pathname.startsWith(canonicalPath)) return false;
      const suffix = pathname.slice(canonicalPath.length);
      return /^(?:https?:\/|%3c|<)/i.test(suffix);
    }
  );
  const prefixRedirect = canonicalPrefixRedirects.find(([source]) => pathname.startsWith(source));
  const destinationPath = canonicalPathRedirects.get(pathname)
    || (prefixRedirect && `${prefixRedirect[1]}${pathname.slice(prefixRedirect[0].length)}`)
    || corruptedProductPath;
  if (!destinationPath) return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = destinationPath;
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: [
    "/Apparel-and-Accessories/:path*",
    "/office-and-writing/notebook-and-diary",
    "/categories/:path*",
    "/employee-gifts",
    "/Technology%20Accessories",
    "/privacy",
    "/blog",
    "/festival-gifts",
    "/collection/__CANONICAL__",
    "/apparel-and-accessories/polo-t-shirts/:path*",
    "/drink-ware/:path*",
    "/bags-and-travel/backpacks/:path*",
    "/eco-products/cork-laptop-bag-and-wallet/:path*",
  ],
};
