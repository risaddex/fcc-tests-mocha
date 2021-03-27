const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200, 'res.status should be 200');
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=xy_z")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });
    // #3
    test('send {"surname": "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({surname: "Colombo"})
        .end(function (err, res) {
          assert.equal(res.status, 200, 'req status should be 200');
          assert.equal(res.type, 'application/json', 'it should be a application/json')
          assert.equal(res.body.name, 'Cristoforo', 'should be Cristóvão');
          assert.equal(res.body.surname, 'Colombo', 'should be Colombo');
        
          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({surname: 'da Verrazzano'})
        .end((err, res) => {
          assert.equal(res.status, 200, 'req status should be 200');
          assert.equal(res.type, 'application/json', 'it should be a application/json')
          assert.equal(res.body.name, 'Giovanni', 'should be Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano', 'should be da Verrazzano');
        })

      done();
    });
  });
});

const Browser = require("zombie");

const browser = new Browser()
browser.site = 'https://salty-tundra-83281.herokuapp.com'


// browser.site = 'http://localhost:3000'

suiteSetup(function (done) {
  return browser.visit('/', done)
})

suite("Functional Tests with Zombie.js", function () {

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      browser.fill("surname", "Colombo").pressButton('submit', function () {
        browser.assert.success()
        browser.assert.text('span#name', 'Cristoforo', 'should be Cristoforo')
        browser.assert.text('span#surname', 'Colombo')
        browser.assert.element('span#dates', 1)
      
        done()
      })
    });

    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      browser.fill("surname", "Vespucci").pressButton('submit', function () {
        browser.assert.success()
        browser.assert.text('span#name', 'Amerigo', 'should be Amerigo')
        browser.assert.text('span#surname', 'Vespucci', 'should be Vespucci')
        browser.assert.element('span#dates', 1)
        
        done()
      })
    });
  });

});
