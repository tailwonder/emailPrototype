var express = require('express');
var request = require('supertest');

describe('res', function(){
  describe('.get(field)', function(){
    it('should get the response header field', function (done) {
      var app = express();

      app.use(function (req, res) {
        res.setHeader('text/plain', 'text/x-foo');
        res.send(res.get('text/plain'));
      });

      request(app)
      .get('/')
      .expect(200, 'text/x-foo', done);
    })
  })
})
