const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const faker = require("faker");
const { response } = require("express");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/iklan-baris-category`;
const checkIklanBarisCategoryName = (iklan_baris_category_name) => {
  connection.query(
    `SELECT * FROM iklan_baris_category_table WHERE iklan_baris_category_name = ?`,
    iklan_baris_category_name,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const data = {
  iklan_baris_category_name: faker.random.word(),
};
const newData = {
  iklan_baris_category_name: faker.random.word(),
};

describe("Iklan Baris Category API", () => {
  describe("/POST iklan baris category", () => {
    it("It should POST a new iklan baris category", (done) => {
      chai
        .request(api)
        .post("/")
        .send(data)
        .end((error, response) => {
          expect(response.body).to.be.a("Object");
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0]).to.have.property(
            "iklan_baris_category_name"
          );
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          done();
        });
    });
  }),
    describe("/GET iklan baris category", () => {
      it("It should GET all iklan baris category", (done) => {
        checkIklanBarisCategoryName(data.iklan_baris_category_name);
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
        it("It should GET search iklan baris category name", (done) => {
          chai
            .request(api)
            .get(
              `/?iklan_baris_category_name=${data.iklan_baris_category_name}`
            )
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");

              expect(response.body.result[index])
                .to.have.property("id")
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_category_name")
                .equal(data.iklan_baris_category_name);
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
    describe("/PATCH iklan baris category", () => {
      it("It should PATCH iklan baris category", (done) => {
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
            expect(response.body.result[index])
              .to.have.property("id")
              .equal(id);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_category_name")
              .equal(newData.iklan_baris_category_name);
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
    describe("/DELETE iklan baris category", () => {
      it("It should DELETE iklan baris category", (done) => {
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
