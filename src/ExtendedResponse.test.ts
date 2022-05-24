import { ExtendedResponse } from "./ExtendedResponse";

test("forwards method calls to Response", () => {
  const req = ExtendedResponse(new Response("Hello world!"));
  expect(req.ok).toBe(true);
});

test("forwards method calls to Response that access internal values", () => {
  const req = ExtendedResponse(new Response("", { status: 500 }));
  expect(req.status).toBe(500);
});

describe("get", () => {
  test("returns the corresponding HTTP header", () => {
    const res = ExtendedResponse(
      new Response("", {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
    );

    expect(res.get("Content-Type")).toBe("application/json");
  });
});

describe("json", () => {
  test("encodes a json object and sets the content type to json", async () => {
    const response = ExtendedResponse().json({ user: "giovannibenussi" });

    expect(await response.text()).toBe('{"user":"giovannibenussi"}');
    expect(response.get("Content-Type")).toBe("application/json");
  });

  test("encodes null and sets the content type to json", async () => {
    const response = ExtendedResponse().json(null);

    expect(await response.text()).toBe("null");
    expect(response.get("Content-Type")).toBe("application/json");
  });
});
