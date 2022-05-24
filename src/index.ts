export { ExtendedRequest } from "./ExtendedRequest";
export { ExtendedResponse } from "./ExtendedResponse";

export function handleRequest(request) {
  return new Response(`URL: ${request.url}`);
}
