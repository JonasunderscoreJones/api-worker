import { handleV1Requests } from "./v1/v1RequestHandler.js";
import { notFoundError } from "./stdErrorResponses.js";

addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event.request));
});
function stripUrl(url) {
	const port = url.port;
	const domain = url.hostname;
	return url.toString().replace(domain, "").replace("https://", "").replace("http://", "").replace(":" + port, "");
}
async function handleRequest(request) {
	let pathname = stripUrl(new URL(request.url));
	if (pathname.startsWith("/v1/")) {
		return handleV1Requests(pathname, request);
	} else {
		return notFoundError();
	}
}
