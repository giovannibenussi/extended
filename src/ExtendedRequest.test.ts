import { ExtendedRequest } from "./ExtendedRequest";

describe(".param", () => {
  test.only("returns the corresponding parameter", async () => {
    const request = new Request("https://giovannibenussi.com", {
      body: '{"first_name":"Giovanni"}',
      method: "POST",
    });
    const req = new ExtendedRequest(request);

    expect(await req.param("first_name")).toBe("Giovanni");
    expect(await req.param("not_defined")).toBe(undefined);
  });
});
