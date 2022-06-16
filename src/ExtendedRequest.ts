//class ExtendedRequest {
//originalRequest: Request;

//constructor(originalRequest: Request) {
//this.originalRequest = originalRequest;
//}

//param(name: string): Promise<string | undefined> {
//return this.originalRequest
//.json()
//.then((params) => {
//return params[name];
//})
//.catch((error) => {
//undefined;
//});
//}
//}

export interface ExtendedRequestType extends Request {}

function extendedRequest(request: Request) {
  const prototype = Object.create(Request.prototype);

  Object.setPrototypeOf(request, prototype);
  return request;
}
export { extendedRequest };
