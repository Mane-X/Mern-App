const chai = require("chai");
const { it } = require("mocha");
const expect = chai.expect;
const request = require("request");

describe("Status", function () {
	describe("Landing page", function () {
		it("status", function (done) {
			request("http://localhost:5050", function (error, response, body) {
                expect(response.statusCode).to.equal(404);
                //they are not authenticated 
			});
			done();
		});
	});
});
