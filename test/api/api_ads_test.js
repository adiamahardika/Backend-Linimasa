const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const expect = require("chai").expect;
const faker = require("faker");
const chaiHttp = require("chai-http");
const fileSystem = require("fs");
chai.use(chaiHttp);

let global = {};
const api = `${ip}/ads`;
const checkAdsName = (ads_name) => {
  connection.query(
    `SELECT * FROM ads_table WHERE ads_name = ?`,
    ads_name,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const data = {
  ads_name: faker.random.word(),
  ads_image:
    "../backend_lensajabar/assets/upload/images/profile/default-profile-images.png",
};
const newData = {
  ads_name: faker.random.word(),
  ads_image:
    "../backend_lensajabar/assets/upload/images/profile/default-profile-images.png",
};
describe("Ads API", () => {
  describe("/POST ads", () => {
    it("It should POST a new ads", (done) => {
      chai
        .request(api)
        .post("/")
        .field("ads_name", data.ads_name)
        .attach(
          "ads_image",
          fileSystem.readFileSync(data.ads_image),
          "default-profile-images.png"
        )
        .end((error, response) => {
          expect(response.body).to.be.a("Object");
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0]).to.have.property("ads_name");
          expect(response.body.result[0]).to.have.property("ads_image");
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          done();
        });
    });
  }),
    describe("/GET ads", () => {
      it("It should GET all ads", (done) => {
        checkAdsName(data.ads_name);
        chai
          .request(api)
          .get("/")
          .end((error, response) => {
            expect(response.body).to.be.a("object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            done();
          });
      }),
        it("It should GET detail ads", (done) => {
          const id = global[0].id;
          chai
            .request(api)
            .get("/" + id)
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.have.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");
              expect(response.body.result[index])
                .to.have.property("id")
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("ads_name")
                .equal(data.ads_name);
              expect(response.body.result[index])
                .to.have.property("ads_image")
                .equal(global[0].ads_image);
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
    describe("/PATCH ads", () => {
      it("It should PATCH ads with upload image", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .patch("/" + id)
          .field("ads_name", newData.ads_name)
          .attach(
            "ads_image",
            fileSystem.readFileSync(newData.ads_image),
            "default-profile-images.png"
          )
          .end((error, response) => {
            let index = getIndex(response.body.result);
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body.result[index])
              .to.have.property("id")
              .equal(global[0].id);
            expect(response.body.result[index])
              .to.have.property("ads_name")
              .equal(newData.ads_name);
            expect(response.body.result[index]).to.have.property("ads_image");
            expect(response.body.result[index]).to.have.property(
              "date_created"
            );
            expect(response.body.result[index]).to.have.property(
              "date_updated"
            );
            done();
          });
      }),
        it("It should PATCH ads without upload image", (done) => {
          const id = global[0].id;
          chai
            .request(api)
            .patch("/" + id)
            .field("ads_name", newData.ads_name)
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body.result[index])
                .to.have.property("id")
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("ads_name")
                .equal(newData.ads_name);
              expect(response.body.result[index]).to.have.property("ads_image");
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
    describe("/DELETE ads", () => {
      it("It should DELETE ads", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .delete("/" + id)
          .end((error, response) => {
            expect(response.body).to.have.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            done();
          });
      });
    });
});
