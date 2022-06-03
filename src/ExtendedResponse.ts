// @ts-ignore
import { getType } from "mime/lite";

class ExtendedResponse {
  statusCode: number;
  headers: Headers;
  originalResponse: Response | undefined;

  constructor(originalResponse?: Response) {
    this.originalResponse = originalResponse;
    this.statusCode = 200;
    if (originalResponse) {
      this.headers = originalResponse.headers;
    } else {
      this.headers = new Headers();
    }
  }

  get(name: string) {
    return this.headers.get(name);
  }

  set(...params: [string, string] | [object]) {
    if (params.length === 1) {
      for (const [name, value] of Object.entries(params[0])) {
        this.headers.set(name, value);
      }
    } else {
      const [name, value] = params;
      this.headers.set(name, value);
    }

    return this;
  }

  setIfEmpty(name:string, value:string) {
    if (!this.get(name)) {
      this.set(name, value);
    }

    return this;
  }

  status(value:number) {
    this.statusCode = value;
    return this;
  }

  buildResponse(body:any) {
    return new Response(body, {
      status: this.statusCode,
      headers: this.headers,
    });
  }

  send(body:any): Response {
    switch (typeof body) {
      case "string":
        this.setIfEmpty("Content-Type", "text/html;charset=UTF-8");
        return this.buildResponse(body);
      default:
        return this.json(body);
    }
  }

  json(body:any) {
    this.setIfEmpty("Content-Type", "application/json");
    return this.buildResponse(JSON.stringify(body));
  }

  error(body:any): Response {
    return this.status(500).send(body);
  }

  type(value:string) {
    this.set("Content-Type", getType(value));
    return this;
  }
}

export { ExtendedResponse };
