const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const fileSystem = require("fs");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const faker = require("faker");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/video`;
const checkVideo = (video_title) => {
  connection.query(
    `SELECT * FROM video_table WHERE video_title = ?`,
    video_title,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (index) => {
  return index.findIndex((x) => x.id === global[0].id);
};
const video = "../backend_lensajabar/video_test.mp4";
const data = {
  video_title: faker.lorem.sentence(),
  video,
  video_description: faker.lorem.paragraph(),
  video_author: faker.name.findName(),
  video_category: faker.random.words(),
};
const newData = {
  video_title: faker.lorem.sentence(),
  video,
  video_description: faker.lorem.paragraph(),
  video_author: faker.name.findName(),
  video_category: faker.random.words(),
};
const pagination = {
  limit: 1,
  page: 1,
};
describe("Video API", () => {
  describe("/POST video", () => {
    it("It should POST a new video", (done) => {
      chai
        .request(`${ip}/video`)
        .post("/")
        .field("video_title", data.video_title)
        .attach("video", fileSystem.readFileSync(video), "video.mp4")
        .field("video_description", data.video_description)
        .field("video_author", data.video_author)
        .field("video_category", data.video_category)
        .end((error, response) => {
          expect(response.body).to.be.a("Object");
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).have.property("id");
          expect(response.body.result[0]).have.property("video_title");
          expect(response.body.result[0]).have.property("video");
          expect(response.body.result[0]).have.property("video_description");
          expect(response.body.result[0]).have.property("video_author");
          expect(response.body.result[0]).have.property("video_category");
          expect(response.body.result[0]).have.property("date_created");
          expect(response.body.result[0]).have.property("date_updated");
          expect(response.body.result[0]).have.property("video_category_name");
          expect(response.body.result[0]).have.property("user_name");
          done();
        });
    });
  }),
    describe("/GET video", () => {
      it("It should GET All video", (done) => {
        checkVideo(data.video_title);
        chai
          .request(api)
          .get("/")
          .end((error, response) => {
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("total_data");
            expect(response.body).to.have.property("total_pages");
            expect(response.body).to.have.property("result");
            done();
          });
      }),
        it("It should GET Search video_title and video_category", (done) => {
          chai
            .request(api)
            .get(
              `/?video_title=${data.video_title}&video_category=${data.video_category}`
            )
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("total_data");
              expect(response.body).to.have.property("total_pages");
              expect(response.body).to.have.property("result");
              expect(response.body.result[index]).to.have.property("id");
              expect(response.body.result[index]).to.have.property(
                "video_title"
              );
              expect(response.body.result[index]).to.have.property("video");
              expect(response.body.result[index]).to.have.property(
                "video_description"
              );
              expect(response.body.result[index]).to.have.property(
                "video_author"
              );
              expect(response.body.result[index]).to.have.property(
                "video_category"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "video_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        }),
        it("It should GET Search video sort_by, order_by, limit, page", (done) => {
          chai
            .request(api)
            .get(
              `/?limit=${pagination.limit}&page=${pagination.page}&sort_by=date_updated&order_by=DESC`
            )
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("total_data");
              expect(response.body).to.have.property("total_pages");
              expect(response.body).to.have.property("result");
              expect(response.body.result[index]).to.have.property("id");
              expect(response.body.result[index]).to.have.property(
                "video_title"
              );
              expect(response.body.result[index]).to.have.property("video");
              expect(response.body.result[index]).to.have.property(
                "video_description"
              );
              expect(response.body.result[index]).to.have.property(
                "video_author"
              );
              expect(response.body.result[index]).to.have.property(
                "video_category"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "video_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        }),
        it("It should GET Detail video", (done) => {
          const id = global[0].id;
          chai
            .request(api)
            .get(`/` + id)
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("total_data").equal(1);
              expect(response.body).to.have.property("total_pages").equal(1);
              expect(response.body).to.have.property("result");
              expect(response.body.result[index])
                .to.have.property("id")
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("video_title")
                .equal(data.video_title);
              expect(response.body.result[index]).to.have.property("video");
              expect(response.body.result[index])
                .to.have.property("video_description")
                .equal(data.video_description);
              expect(response.body.result[index])
                .to.have.property("video_author")
                .equal(data.video_author);
              expect(response.body.result[index])
                .to.have.property("video_category")
                .equal(data.video_category);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "video_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        });
    }),
    describe("/PATCH video", () => {
      it("It should PATCH video with upload video", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .patch("/" + id)
          .field("video_title", newData.video_title)
          .attach("video", fileSystem.readFileSync(video), "video.mp4")
          .field("video_description", newData.video_description)
          .field("video_author", newData.video_author)
          .field("video_category", newData.video_category)
          .end((error, response) => {
            let index = getIndex(response.body.result);
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body.result[index])
              .have.property("id")
              .equal(global[0].id);
            expect(response.body.result[index])
              .have.property("video_title")
              .equal(newData.video_title);
            expect(response.body.result[index]).have.property("video");
            expect(response.body.result[index])
              .have.property("video_description")
              .equal(newData.video_description);
            expect(response.body.result[index])
              .have.property("video_author")
              .equal(newData.video_author);
            expect(response.body.result[index])
              .have.property("video_category")
              .equal(newData.video_category);
            expect(response.body.result[index]).have.property("date_created");
            expect(response.body.result[index]).have.property("date_updated");
            expect(response.body.result[index]).have.property(
              "video_category_name"
            );
            expect(response.body.result[index]).have.property("user_name");
            done();
          }),
          it("It should PATCH video without upload video", (done) => {
            const id = global[0].id;
            chai
              .request(api)
              .patch("/" + id)
              .field("video_title", newData.video_title)
              .field("video_description", newData.video_description)
              .field("video_author", newData.video_author)
              .field("video_category", newData.video_category)
              .end((error, response) => {
                let index = getIndex(response.body.result);
                expect(response.body).to.be.a("Object");
                expect(response.body).to.have.status(200);
                expect(response.body).to.have.property("result");
                expect(response.body.result[index])
                  .have.property("id")
                  .equal(global[0].id);
                expect(response.body.result[index])
                  .have.property("video_title")
                  .equal(newData.video_title);
                expect(response.body.result[index]).have.property("video");
                expect(response.body.result[index])
                  .have.property("video_description")
                  .equal(newData.video_description);
                expect(response.body.result[index])
                  .have.property("video_author")
                  .equal(newData.video_author);
                expect(response.body.result[index])
                  .have.property("video_category")
                  .equal(newData.video_category);
                expect(response.body.result[index]).have.property(
                  "date_created"
                );
                expect(response.body.result[index]).have.property(
                  "date_updated"
                );
                expect(response.body.result[index]).have.property(
                  "video_category_name"
                );
                expect(response.body.result[index]).have.property("user_name");
                done();
              });
          });
      });
    }),
    describe("/DELETE video", () => {
      it("It should DELETE video", (done) => {
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
