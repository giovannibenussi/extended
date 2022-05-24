type ExtendedResponseType = Response & {
  get: (string) => string;
  json: (object) => ExtendedResponseType;
};

function ExtendedResponse(res = null): ExtendedResponseType {
  if (!res) {
    res = new Response();
  }
  const prototype = Object.create(Response.prototype);

  prototype.get = function(name) {
    return this.headers.get(name);
  };

  prototype.set = function(name, value) {
    return this.headers.set(name, value);
  };

  prototype.json = function(body) {
    console.log("this.headers:", this.headers);
    if (!this.get("Content-Type")) {
      this.set("Content-Type", "application/json");
    }

    return ExtendedResponse(
      new Response(JSON.stringify(body), {
        headers: { "Content-Type": this.get("Content-Type") },
      })
    );
  };

  Object.setPrototypeOf(res, prototype);
  return res;
}

export { ExtendedResponse };
