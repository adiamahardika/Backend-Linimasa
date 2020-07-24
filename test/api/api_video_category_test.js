const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const faker = require("faker");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/video-category`;
const checkVideoCategoryName = (video_category_name) => {
  connection.query(
    `SELECT * FROM video_category_table WHERE video_category_name = ?`,
    video_category_name,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const data = {
  video_category_name: faker.random.word(),
};
const newData = {
  video_category_name: faker.random.word(),
};

describe("Video Category API", () => {
  describe("/POST video category", () => {
    it("It should POST a new video category", (done) => {
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
            "video_category_name"
          );
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          done();
        });
    });
  }),
    describe("/GET video category", () => {
      it("It should GET all video category", (done) => {
        checkVideoCategoryName(data.video_category_name);
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
        it("It should GET search video category name", (done) => {
          chai
            .request(api)
            .get(`/?video_category_name=${data.video_category_name}`)
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");
              expect(response.body.result[index])
                .to.have.property("id")
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("video_category_name")
                .equal(data.video_category_name);
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
    describe("/PATCH video category", () => {
      it("It should PATCH video category", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .patch("/" + id)
          .send(newData)
          .end((error, response) => {
            let index = getIndex(response.body.result);
            expect(response.body).to.be.a("object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body.result[index])
              .to.have.property("id")
              .equal(global[0].id);
            expect(response.body.result[index])
              .to.have.property("video_category_name")
              .equal(newData.video_category_name);
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
    describe("/DELETE video category", () => {
      it("It should DELETE video category", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .delete("/" + id)
          .end((error, response) => {
            expect(response.body).to.be.a("object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            done();
          });
      });
    });
});
