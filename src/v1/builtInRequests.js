import { internalServerError } from '../stdErrorResponses.js';
import { version } from '../../package.json';

export const builtinRequests = ["ping", "version", "help"];

export function isBuiltinRequest(request) {
  return builtinRequests.includes(request);
}

export function returnVersion() {
  return new Response(JSON.stringify([version]), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export function handleBuiltinRequest(request) {
  switch (request) {
    case "ping":
      return new Response("pong");
    case "version":
      return returnVersion();
    case "help":
      return new Response("Please refer to the wiki at https://wiki.jonasjones.dev/Api/");
    default:
      return internalServerError();
  }
}