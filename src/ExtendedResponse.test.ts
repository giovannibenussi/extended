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
