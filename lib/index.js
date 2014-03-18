
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
