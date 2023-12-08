const lastfmRequests = ['gettrackinfo', 'getrecent']

export function isLastfmRequest(pathname) {
    return pathname.startsWith("lastfm/")
}

export function handleLastfmRequest(pathname) {
    requestUrl = new URL(pathname, "https://api.jonasjones.dev/v1/" + pathname)
    requestType = pathname.replace("lastfm/", "").split("?")[0];
    switch (requestType) {
        case "gettrackinfo":
            return getTrackInfoRequestHandler(requestUrl);
        case "getrecent":
            return getRecentRequestHandler(requestUrl);
        default:
            return notFoundError();
    }
}

function getRecentRequestHandler(requestUrl) {
    const urlParams = new URLSearchParams(requestUrl.search);
    const offset = urlParams.get("offset");
    const limit = urlParams.get("limit");
    return new Response(JSON.stringify([offset, limit]), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

function getTrackInfoRequestHandler(requestUrl) {
    const urlParams = new URLSearchParams(requestUrl.search);
    const track = urlParams.get("track");
    const artist = urlParams.get("artist");
    return new Response(JSON.stringify([track, artist]), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}