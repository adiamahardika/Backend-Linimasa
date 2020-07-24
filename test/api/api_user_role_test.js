const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const faker = require("faker");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/user-role`;
const checkUserRoleName = (user_role_name) => {
  connection.query(
    `SELECT * FROM user_role_table WHERE user_role_name = ?`,
    user_role_name,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const data = {
  user_role_name: faker.random.word(),
};
const newData = {
  user_role_name: faker.random.word(),
};
describe("User Role API", () => {
  describe("/POST user role", () => {
    it("It should POST a new user role", (done) => {
      chai
        .request(api)
        .post("/")
        .send(data)
        .end((error, response) => {
          expect(response.body).to.be.a("Object");
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0]).to.have.property("user_role_name");
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          done();
        });
    });
  }),
    describe("/GET user role", () => {
      it("It should GET all user role", (done) => {
        checkUserRoleName(data.user_role_name);
        chai
          .request(api)
          .get("/")
          .end((error, response) => {
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            done();
          });
      }),
        it("It should Get search user role", (done) => {
          chai
            .request(api)
            .get(`/?user_role_name=${data.user_role_name}`)
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");
              expect(response.body.result[index])
                .to.have.property("id")
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("user_role_name")
                .equal(data.user_role_name);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              done();
            });
        });
    }),
    describe("/PATCH user role", () => {
      it("It should PATCH user role", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .patch("/" + id)
          .send(newData)
          .end((error, response) => {
            let index = getIndex(response.body.result);
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body.result[index]).to.have.property("id");
            expect(response.body.result[index])
              .to.have.property("user_role_name")
              .equal(newData.user_role_name);
            expect(response.body.result[index]).to.have.property(
              "date_created"
            );
            expect(response.body.result[index]).to.have.property(
              "date_updated"
            );
            done();
          });
      });
    }),
    describe("/DELETE user role", () => {
      it("It should DELETE user role", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .delete("/" + id)
          .end((error, response) => {
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            done();
          });
      });
    });
});
