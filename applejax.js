(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var Request = require('./request');

var ajax = {
  ajax: function(options) {
    return new Request(options);
  },

  get: function(url, query) {
    return new Request({
      method: 'GET',
      url: url,
      query: query,
    });
  },

  post: function(url, body) {
    return new Request({
      method: 'POST',
      url: url,
      body: body,
    });
  },

  put: function(url, body) {
    return new Request({
      method: 'PUT',
      url: url,
      body: body,
    });
  },

  head: function(url, query) {
    return new Request({
      method: 'HEAD',
      url: url,
      query: query,
    });
  },

  options: function(url, query) {
    return new Request({
      method: 'OPTIONS',
      url: url,
      query: query,
    });
  },

  delete: function(url, query) {
    return new Request({
      method: 'DELETE',
      url: url,
      query: query,
    });
  },

};

},{"./request":2}],2:[function(require,module,exports){

var UNSENT = 0;
var OPENED = 1;
var HEADERS_RECEIVED = 2;
var LOADING = 3;
var DONE = 4;

/**
 * Constructor.
 * @param {Object} options The request options.
 */
var Request = function(options) {
  this.options = options;
  this.xhr = new XMLHttpRequest();
  if (this.options.timeout) {
    this.xhr.timeout = this.options.timeout;
  }
  if (this.options.withCredentials) {
    this.xhr.withCredentials = this.options.withCredentials;
  }
  if (!this.options.method) {
    this.options.method = 'GET';
  }
};

/**
 * [serialize description]
 * @param  {Object} object The string or JS object to serialize
 * @return {String}        The serialized query string or JSON string.
 */
Request.prototype.serialize = function(object) {
  if (typeof object == 'string') {
    return object;
  }
  return this.options.json ? JSON.stringify(object) : this.querystring(object);
};

/**
 * Build a URL query string. Supports arrays and objects.
 * @param  {Object} object The parameter object to serialize
 * @return {String}        The URL-encoded query string
 */
Request.prototype.querystring = function(object) {
  if (typeof object == 'string') {
    return object;
  }
  var query = '';
  var self = this;
  var format = function(key, value) {
    return '&' + key + '=' + encodeURIComponent(value);
  };
  Object.keys(object).forEach(function(key) {
    if (Array.isArray(object[key])) {
      object[key].forEach(function(v, i) {
        query += format(key + '[' + i + ']', object[key]);
      });
    }
    else if (typeof object[key] == 'object') {
      // TODO: Recursive objects. Necessary?
      Object.keys(object[key]).forEach(function(k) {
        query += format(key + '[' + k + ']', object[k]);
      });
    }
    else {
      query += format(key, object[key]);
    }
  });
  return query.substring(1);
};

/**
 * Add a header to the XHR.
 * @param  {String} name  The header name
 * @param  {String} value The header value
 * @return {void}
 */
Request.prototype.header = function(name, value) {
  this.setRequestHeader(name, value);
};

/**
 * Set multiple headers in one call!
 * @param  {Object} headers The header hash
 * @return {void}
 */
Request.prototype.headers = function(headers) {
  var self = this;
  Object.keys(headers).forEach(function(key) {
    self.header(key, header[key]);
  });
};

/**
 * Dafaults content type to plain old form style.
 * @return {void}
 */
Request.prototype.form = function() {
  this.options.json = false;
  this.xhr.responseType = '';
  this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
};

/**
 * Sets the request content type and sets the request to
 * be automatically JSON parsed.
 * @return {void}
 */
Request.prototype.json = function() {
  this.options.json = true;
  this.xhr.responseType = 'json';
  this.xhr.setRequestHeader('Content-Type', 'application/json');
};

/**
 * Perform the request. Suppy a callback function.
 *
 * The callback is passed a hash with the following properties:
 * - status: the HTTP status code
 * - body: the response body
 * - headers: the response header hash
 *
 * @param  {Function} fn The callback function
 * @return {void}
 */
Request.prototype.exec = function(fn) {

  this.callback = fn;
  this.xhr.open(this.options.method, this.options.url);

  var self = this;
  Object.keys(this.headers).forEach(function(key) {
    self.xhr.setRequestHeader(key, self.headers[key]);
  });

  this.xhr.onreadystatechange = function() {
    var state = this.readyState;
    if (state == DONE) {
      self.callback({
        status: this.status,
        response: this.responseText,
        headers: this.getAllResponseHeaders(),
      });
    }
  };

  var url = this.options.url;
  var body = this.serialize(this.options.body);

  if (this.options.query) {
    url += '?' + this.querystring(this.options.query);
  }

  this.xhr.send(body);
};

},{}]},{},[1])