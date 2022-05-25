import { lookup } from "mime-types";

type ExtendedResponseType = Response & {
  //statusCode: number;
  get: (string) => string;
  json: (object) => ExtendedResponseType;

  status: (number) => ExtendedResponseType;
};

class ExtendedResponse {
  statusCode: number;
  headers: Headers;
  originalResponse: Response;

  constructor(originalResponse?: Response) {
    this.originalResponse = originalResponse;
    if (originalResponse) {
      this.headers = originalResponse.headers;
    } else {
      this.headers = new Headers();
    }
  }

  get(name) {
    return this.headers.get(name);
  }

  set(...params: [string, string] | [object]) {
    if (typeof params[0] === "object") {
      for (const [name, value] of Object.entries(params[0])) {
        this.headers.set(name, value);
      }
    } else {
      const [name, value] = params;
      this.headers.set(name, value);
    }

    return this;
  }

  setIfEmpty(name, value) {
    if (!this.get(name)) {
      this.set(name, value);
    }

    return this;
  }

  status(value) {
    this.statusCode = value;
    return this;
  }

  buildResponse(body) {
    return new Response(body, {
      status: this.statusCode,
      headers: this.headers,
    });
  }

  send(body): Response {
    switch (typeof body) {
      case "string":
        this.setIfEmpty("Content-Type", "text/html;charset=UTF-8");
        return this.buildResponse(body);
      default:
        return this.json(body);
    }
  }

  json(body) {
    this.setIfEmpty("Content-Type", "application/json");
    return this.buildResponse(JSON.stringify(body));
  }

  type(value) {
    this.set("Content-Type", lookup(value));
    return this;
  }
}

export { ExtendedResponse };
