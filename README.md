# Extended

Handy extensions that returns native `Request` and `Response` objects.

# Usage

This library provides a lot of utilities, but in the end, all you get is a
native `Resquest` and `Response` objects to have maximum compatibility with all
platforms including [CloudFlare Workers](https://developers.cloudflare.com/workers/), [Node.js](https://nodejs.org/en/), and even [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)!

```js
const res = new ExtendedResponse()
res.status(500).json({ user: "giovannibenussi" })
```

In the real world, you'll get an instance of `ExtendedResponse` provided by your
framework of choice, so you'll rarely call the constructor.

You can perform a redirect by calling the `.redirect` method:

```js
res.redirect('http://giovannibenussitest.com', 307)
```

As the philosophy of this library, the previous code is equivalent of calling
`Response.redirect` with the added benefit of having utility classes to set
headers, cookies, or whatever you want!
