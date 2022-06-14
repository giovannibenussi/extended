import { ExtendedResponse } from "./ExtendedResponse";

//test("forwards method calls to Response", () => {
//const req = new ExtendedResponse().send();
//expect(req.ok).toBe(true);
//});

//test("forwards method calls to Response that access internal values", () => {
//const req = ExtendedResponse();
//expect(req.statusCode).toBe(500);
//});

describe("default response", () => {
  test("returns the corresponding HTTP header", () => {
    const res = new ExtendedResponse().json({});

    expect(res.headers.get("Content-Type")).toBe("application/json");
  });
});

describe("statusCode", () => {
  test("allows to access the internal access code", () => {
    const res = new ExtendedResponse().status(500);

    expect(res.statusCode).toBe(500);
  });
});

describe("get", () => {
  test("returns the corresponding HTTP header", () => {
    const res = new ExtendedResponse();

    res.set("Content-Type", "application/json");

    expect(res.get("Content-Type")).toBe("application/json");
  });
});

describe("set", () => {
  test("sets the corresponding HTTP header", () => {
    const response = new ExtendedResponse();

    response.set("Content-Type", "application/json");

    const res = response.send("");

    expect(res.headers.get("Content-Type")).toBe("application/json");
  });

  test("accepts an object as an argument", () => {
    const response = new ExtendedResponse();
    response.set("Content-Type", "application/json");
    response.set({ "Content-Type": "application/json" });
    const res = response.send("");

    expect(res.headers.get("Content-Type")).toBe("application/json");
  });
});

describe("send", () => {
  describe("when the parameter is a string", () => {
    test("sends the string as the response and sets the content type to html", async () => {
      const response = new ExtendedResponse().send("<p>hello world!</p>");

      expect(await response.text()).toBe("<p>hello world!</p>");
      expect(response.headers.get("Content-Type")).toBe(
        "text/html;charset=UTF-8"
      );
    });

    test("respects previously assigned content types and status code", async () => {
      const response = new ExtendedResponse();
      response.set("Content-Type", "text/png");
      const res = response.status(500).send("<p>hello world!</p>");

      expect(await res.text()).toBe("<p>hello world!</p>");
      expect(res.headers.get("Content-Type")).toBe("text/png");
      expect(res.status).toBe(500);
    });
  });

  describe("when the parameter is an object", () => {
    test("sends a json response", async () => {
      const response = new ExtendedResponse().send({
        username: "giovannibenussi",
      });

      expect(await response.text()).toBe('{"username":"giovannibenussi"}');
      expect(response.headers.get("Content-Type")).toBe("application/json");
    });
  });

  describe("when the parameter is a boolean value", () => {
    test("sends a json response", async () => {
      const response = new ExtendedResponse().send(true);

      expect(await response.text()).toBe("true");
      expect(response.headers.get("Content-Type")).toBe("application/json");
    });
  });

  describe("when the parameter is a number", () => {
    test("sends a json response", async () => {
      const response = new ExtendedResponse().send(1);

      expect(await response.text()).toBe("1");
      expect(response.headers.get("Content-Type")).toBe("application/json");
    });
  });

  describe("when the parameter is an array", () => {
    test("sends a json response", async () => {
      const response = new ExtendedResponse().send([1, "2"]);

      expect(await response.text()).toBe('[1,"2"]');
      expect(response.headers.get("Content-Type")).toBe("application/json");
    });
  });
});

describe("json", () => {
  test("encodes a json object and sets the content type to json", async () => {
    const response = new ExtendedResponse().json({ user: "giovannibenussi" });

    expect(await response.text()).toBe('{"user":"giovannibenussi"}');
    expect(response.headers.get("Content-Type")).toBe("application/json");
  });

  test("encodes null and sets the content type to json", async () => {
    const response = new ExtendedResponse().json(null);

    expect(await response.text()).toBe("null");
    expect(response.headers.get("Content-Type")).toBe("application/json");
  });
});

describe("status", () => {
  test("sets a status code", async () => {
    const response = new ExtendedResponse();
    response.status(500);
    expect(response.json({ user: "giovannibenussi" }).status).toBe(500);
  });

  test("encodes null and sets the content type to json", async () => {
    const response = new ExtendedResponse().json(null);

    expect(await response.text()).toBe("null");
    expect(response.headers.get("Content-Type")).toBe("application/json");
  });
});

describe("redirect", () => {
  test("returns a Location header and a 302 status code by default", async () => {
    const response = new ExtendedResponse();

    let res = response.redirect("https://www.giovannibenussi.com/");

    expect(res.status).toBe(302);
    expect(res.headers.get("Location")).toBe(
      "https://www.giovannibenussi.com/"
    );
  });

  test("supports a custom status code", async () => {
    const response = new ExtendedResponse();

    let res = response.redirect("https://www.giovannibenussi.com/", 307);

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toBe(
      "https://www.giovannibenussi.com/"
    );
  });

  test("supports relative paths", async () => {
    const request = new Request("https://www.giovannibenussi.com");
    const response = new ExtendedResponse({ request });

    let res = response.redirect("posts/latest", 307);

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toBe(
      "https://www.giovannibenussi.com/posts/latest"
    );
  });

  test("supports absolute paths when the base url itself has paths", async () => {
    const request = new Request("https://www.giovannibenussi.com/api/users");
    const response = new ExtendedResponse({ request });

    let res = response.redirect("/posts", 307);

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toBe(
      "https://www.giovannibenussi.com/posts"
    );
  });

  test("supports relative paths when the base url itself has paths", async () => {
    const request = new Request("https://www.giovannibenussi.com/api/user/");
    const response = new ExtendedResponse({ request });

    let res = response.redirect("./posts", 307);

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toBe(
      "https://www.giovannibenussi.com/api/user/posts"
    );
  });

  test("considers urls that don't end with a slash to be part of the current 'directory'", async () => {
    const request = new Request("https://www.giovannibenussi.com/api/user");
    const response = new ExtendedResponse({ request });

    let res = response.redirect("./posts", 307);

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toBe(
      "https://www.giovannibenussi.com/api/posts"
    );
  });

  test("persists query parameters", async () => {
    const response = new ExtendedResponse();

    let res = response.redirect(
      "https://www.giovannibenussi.com/?name=giovanni",
      307
    );

    expect(res.status).toBe(307);
    expect(res.headers.get("Location")).toBe(
      "https://www.giovannibenussi.com/?name=giovanni"
    );
  });
});

describe("type", () => {
  test("sets the Content-Type header according to a given value", async () => {
    const response = new ExtendedResponse();

    let res = response.type("json").send("");
    expect(res.headers.get("Content-Type")).toBe("application/json");

    res = response.type(".md").send("");
    expect(res.headers.get("Content-Type")).toBe("text/markdown");
  });
});
