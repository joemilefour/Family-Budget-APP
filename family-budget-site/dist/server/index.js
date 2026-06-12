export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;
    if (pathname === "/" || pathname === "") pathname = "/family-budget-dashboard.html";
    if (env.ASSETS) {
      const assetUrl = new URL(pathname, request.url);
      const response = await env.ASSETS.fetch(new Request(assetUrl, request));
      if (response.status !== 404) return response;
    }
    return new Response("Not found", { status: 404 });
  }
};
