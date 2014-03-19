## Hyper-minimal AJAX client for the browser

My goal was to create a modern, tiny and convenient AJAX request library with no dependencies.

873B unglified and gzipped!

Inspired by superagent and miniajax.

### Install

`bower install applejax`

### Dependencies

None!

### Use

Basic request:

```js
req.ajax({
  method: 'GET',
  url: 'http://some.url',
  timeout: 100,
  withCredentials: true,
}).exec(function(result) {
  console.log(result.status, result.response, result.headers);
});
```

Convenient examples:

```js
req
  .get('http://some.url?query=foo')
  .json()
  .exec(function(result) {
    console.log(result.status, result.response, result.headers);
  });
```

```js
req
  .get('http://some.url', {accepts: 'objects!'})
  .json() // Sets the Content-Type header and auto-parses response
  .exec(function(result) {
    console.log(result.status, result.response, result.headers);
  });
```

Here's a POST request:

```js
req
  .post('http://some.url', {'no stringify call': 'required'})
  .json()
  .exec(function(result) {
    console.log(result.status, result.response, result.headers);
  });
```

Custom headers:

```js
req
  .get('http://www.google.com')
  .header('X-Baller', 'Shot-caller')
  .exec(function(result) {
    console.log(result.status, result.response, result.headers);
  });
```

or:

```js
req
  .post('http://some.url', {'no stringify call': 'required'})
  .headers({
    'X-Awesome': 'Sauce',
  })
  .exec(function(result) {
    console.log(result.status, result.response, result.headers);
  });
```

Thanks for checking it out!

Feedback welcome :) @mikejholly
