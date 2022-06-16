import { extendedRequest } from "./ExtendedRequest";

describe("#url", () => {
  test("appends a slash at the end of the url if it is the root path", async () => {
    const request = new Request("https://giovannibenussi.com");
    const req = extendedRequest(request);

    expect(await req.url).toBe("https://giovannibenussi.com/");
  });

  test("appends a slash at the end of the url", async () => {
    const request = new Request("https://giovannibenussi.com/index.html");
    const req = extendedRequest(request);

    expect(await req.url).toBe("https://giovannibenussi.com/index.html");
  });
});

//describe(".param", () => {
//test("returns the corresponding parameter", async () => {
//const request = new Request("https://giovannibenussi.com", {
//body: '{"first_name":"Giovanni"}',
//method: "POST",
//});
//const req = extendedRequest(request);

//expect(await req.param("first_name")).toBe("Giovanni");
//expect(await req.param("not_defined")).toBe(undefined);
//});
//});
