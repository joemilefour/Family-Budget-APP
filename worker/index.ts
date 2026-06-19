const contentTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".sql": "text/plain; charset=utf-8",
};

export default {
  async fetch(request: Request, env: { ASSETS?: Fetcher }): Promise<Response> {
    const url = new URL(request.url);
    let pathname = url.pathname;

    if (pathname === "/" || pathname === "") {
      pathname = "/family-budget-dashboard.html";
    }

    const assetResponse = await fetchAsset(env, request, pathname);
    if (assetResponse) return assetResponse;

    return new Response("Not found", { status: 404 });
  },
};

async function fetchAsset(env: { ASSETS?: Fetcher }, request: Request, pathname: string) {
  if (env.ASSETS) {
    const assetUrl = new URL(pathname, request.url);
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    if (response.status !== 404) return response;
  }

  return null;
}

export function contentTypeFor(pathname: string) {
  const match = pathname.match(/\.[^.]+$/);
  return match ? contentTypes[match[0]] ?? "application/octet-stream" : "application/octet-stream";
}
