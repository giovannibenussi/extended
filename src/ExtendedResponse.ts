// @ts-ignore
import { getType } from "mime/lite";
// @ts-ignore
import * as URLToolkit from "url-toolkit";

type ExtendedResponseConstructorType =
  | undefined
  | {
      request?: Request;
    };

class ExtendedResponse {
  statusCode: number;
  headers: Headers;
  originalRequest: Request | undefined;

  constructor(params?: ExtendedResponseConstructorType) {
    this.statusCode = 200;
    this.originalRequest = params?.request;
    this.headers = new Headers();
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

  setIfEmpty(name: string, value: string) {
    if (!this.get(name)) {
      this.set(name, value);
    }

    return this;
  }

  status(value: number) {
    this.statusCode = value;
    return this;
  }

  buildResponse(body: any) {
    return new Response(body, {
      status: this.statusCode,
      headers: this.headers,
    });
  }

  send(body: any): Response {
    switch (typeof body) {
      case "string":
        this.setIfEmpty("Content-Type", "text/html;charset=UTF-8");
        return this.buildResponse(body);
      default:
        return this.json(body);
    }
  }

  json(body: any) {
    this.setIfEmpty("Content-Type", "application/json");
    return this.buildResponse(JSON.stringify(body));
  }

  error(body: any): Response {
    return this.status(500).send(body);
  }

  baseURL() {
    return this.originalRequest?.url || "";
  }

  redirect(redirectURL: string, status?: number) {
    const url = URLToolkit.buildAbsoluteURL(this.baseURL(), redirectURL, {
      alwaysNormalize: true,
    });

    return Response.redirect(url, status);
  }

  type(value: string) {
    this.set("Content-Type", getType(value));
    return this;
  }
}

export { ExtendedResponse };
