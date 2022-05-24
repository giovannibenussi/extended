type ExtendedResponseType = Response & {
  get: (string) => string;
};

function ExtendedResponse(res): ExtendedResponseType {
  const prototype = Object.create(Response.prototype);
  prototype.get = function(name) {
    return this.headers.get(name);
  };

  Object.setPrototypeOf(res, prototype);
  return res;
}

export { ExtendedResponse };
