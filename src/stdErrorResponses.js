export function internalServerError() {
  return new Response("Internal Server Error", {
    status: 500,
    statusText: "Internal Server Error",
    message: "The server encountered an internal error and was unable to complete your request."
  });
}

export function notFoundError() {
  return new Response("Not Found", {
    status: 404,
    statusText: "Not Found",
    message: "The requested resource was not found on this server."
  });
}

export function methodNotAllowedError() {
  return new Response("Method Not Allowed", {
    status: 405,
    statusText: "Method Not Allowed",
    message: "The method specified in the request is not allowed for this resource."
  });
}

export function badRequestError() {
  return new Response("Bad Request", {
    status: 400,
    statusText: "Bad Request",
    message: "The server could not understand the request due to invalid syntax."
  });
}