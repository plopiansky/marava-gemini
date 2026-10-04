export default {
  async fetch(request, env) {
    // Serve static assets from dist/
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response("Not found", { status: 404 });
  }
};
