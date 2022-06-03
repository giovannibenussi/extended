type ExtendedRequestType = Request & {
  get: (string) => string;
};

class ExtendedRequest {
  originalRequest: Request;

  constructor(originalRequest: Request) {
    this.originalRequest = originalRequest;
  }

  param(name: string): Promise<string | undefined> {
    return this.originalRequest
      .json()
      .then((params) => {
        return params[name];
      })
      .catch((error) => {
        undefined;
      });
  }
}

export { ExtendedRequest };
