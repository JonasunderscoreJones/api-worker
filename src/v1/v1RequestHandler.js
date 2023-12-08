import { isBuiltinRequest, handleBuiltinRequest } from './builtInRequests.js';
import { methodNotAllowedError, notFoundError } from '../stdErrorResponses.js';
import { handleLastfmRequest, isLastfmRequest } from './lastfm/Requests.js';

export async function handleV1Requests(pathname, request) {
  if (request.method !== "GET") {
    return methodNotAllowedError();
  } else {
    const requestPath = pathname.replace("/v1/", "");
    if (isBuiltinRequest(requestPath)) {
      return handleBuiltinRequest(requestPath);
    } else if (isLastfmRequest(requestPath)) {
      return handleLastfmRequest(requestPath);
    } else {
      return notFoundError();
    }
  }
}