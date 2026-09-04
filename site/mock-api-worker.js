const MESSAGE_PATH = "/marketing-sites-consumer-e2e/mock-api/v1/public/chat";
const PROTOCOL = "ores.chat/v1";
const ALLOWED_CONTEXTS = new Set(["main-marketing", "partner-marketing"]);

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "POST" || url.pathname !== MESSAGE_PATH) return;

  event.respondWith((async () => {
    let payload;
    try {
      payload = await event.request.json();
    } catch {
      return jsonResponse({ error: "invalid_json" }, 400);
    }

    const contextId = String(payload?.context_refs?.[0]?.id ?? "");
    const requestId = String(payload?.request_id ?? "");
    const message = String(payload?.message ?? "").trim();
    if (
      payload?.protocol !== PROTOCOL
      || !/^[A-Za-z0-9_.:/-]{1,256}$/.test(requestId)
      || !ALLOWED_CONTEXTS.has(contextId)
      || !message
      || message.length > 4_000
    ) {
      return jsonResponse({ error: "invalid_public_request" }, 422);
    }

    return jsonResponse({
      protocol: PROTOCOL,
      request_id: requestId,
      answer: `Deterministic test reply for ${contextId}: received “${message}”.`,
      fixture: "ores-chat-test/marketing-sites-consumer-e2e",
    });
  })());
});

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-ores-chat-test-fixture": "true",
    },
  });
}
