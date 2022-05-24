type ExtendedRequestType = Request & {
  get: (string) => string;
};

function ExtendedRequest(res): ExtendedRequestType {
  const prototype = Object.create(Request.prototype);

  Object.setPrototypeOf(res, prototype);
  return res;
}

export { ExtendedRequest };
