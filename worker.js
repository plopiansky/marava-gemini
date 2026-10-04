export default {
  async fetch(request, env) {
    // Serve static assets from dist/ via STATIC_ASSETS binding
    if (env.STATIC_ASSETS) {
      return env.STATIC_ASSETS.fetch(request);
    }
    return new Response("Not found", { status: 404 });
  }
};
