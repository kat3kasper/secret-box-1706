var assert = require('chai').assert;
var app = require('../server');
var request = require('request');

describe('Server', function() {
  before(function(done) {
    this.port = 9876;
    this.server = app.listen(this.port, function(err, result) {
      if (err) { return done(err); }
      done();
    });
    this.request = request.defaults({baseUrl: 'http://localhost:9876'})
  });

  after(function() {
    this.server.close();
  });

  it('should exist', function() {
    assert(app)
  })

  describe('GET /', function() {
    it('should return a 200', function(done){
      this.request.get('/', function(error, response) {
        if (error) {done(error)}
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('should have a body with the name of the app', function(done) {
      var title = app.locals.title;

      this.request.get('/', function(error, response) {
        if (error) {done(error)}

        assert(response.body.includes(title),
          `"${response.body}" does not include "${title}"`)

        done()
      })
    })
  });

  describe('GET /api/secrets/:id', function() {
    beforeEach(function() {
      app.locals.secrets = {wowowo: 'I am a banana'}
    })

    it('should return a 404', function(done) {
      this.request.get('/api/secret/notThere', function(error, response) {
        if (error) {done(error)}
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should have the id and the message', function(done) {
      var id = 'wowowo'
      var message = app.locals.secrets[id]

      this.request.get(`/api/secrets/${id}`, function(error, response) {
        if (error) {done(error)}

        assert(response.body.includes(id),
           `"${response.body}" does not include "${id}".`);
        assert(response.body.includes(message),
           `"${response.body}" does not include "${message}".`);

        done()
      })
    })
  })
})
