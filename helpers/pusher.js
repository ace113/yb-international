var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '963982',
  key: 'f95fb0a7e350014c8ea1',
  secret: 'ffe31d165e6939b1f62e',
  cluster: 'ap2',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});

module.exports = pusher