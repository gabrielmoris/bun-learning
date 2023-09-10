Bun.serve({
  fetch(req) {
    const url = new URL(req.url);

    const bigFile = Bun.file("./me.png");
    const range = req.headers.get("Range");
    let start = 0,
      end = Infinity;

    if (range) {
      const parts = range.split("=");

      if (parts.length > 1) {
        const ranges = parts[1].split("-");
        if (ranges.length > 1) {
          [start, end] = ranges.map(Number);
        }
      }
    }

    if (url.pathname === "/") return new Response(`Home page!`);
    if (url.pathname === "/gabriel")
      return new Response(bigFile.slice(start, end));
    return new Response(`404!`);
  },
});
