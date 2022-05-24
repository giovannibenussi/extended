import { ExtendedRequest } from "./ExtendedRequest";
import { handleRequest } from ".";

test("forwards method calls to Request", () => {
  const url = "https://giovannibenussi.com";
  const req = ExtendedRequest(new Request(url, { method: "POST" }));
  expect(req.method).toBe("POST");
});
