const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const fileSystem = require("fs");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const faker = require("faker");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/news`;
const checkNewsTitle = (news_title) => {
  connection.query(
    `SELECT * FROM news_table WHERE news_title = ?`,
    news_title,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const news_image =
  "../backend_lensajabar/assets/upload/images/profile/default-profile-images.png";
const data = {
  news_title: faker.lorem.word(),
  news_content: faker.lorem.paragraph(),
  news_image,
  news_image_description: faker.lorem.words(),
  news_category: faker.lorem.word(),
  news_author: faker.name.findName(),
};
const newData = {
  news_title: faker.lorem.word(),
  news_content: faker.lorem.paragraph(),
  news_image,
  news_image_description: faker.lorem.words(),
  news_category: faker.lorem.words(),
  news_author: faker.name.findName(),
};
const pagination = {
  limit: 1,
  page: 1,
};
describe("News API", () => {
  describe("/POST news", () => {
    it("It should POST a new news", (done) => {
      chai
        .request(api)
        .post("/")
        .field("news_title", data.news_title)
        .field("news_content", data.news_content)
        .attach(
          "news_image",
          fileSystem.readFileSync(news_image),
          "default-profile-images.png"
        )
        .field("news_image_description", data.news_image_description)
        .field("news_category", data.news_category)
        .field("news_author", data.news_author)
        .end((error, response) => {
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).have.property("id");
          expect(response.body.result[0]).have.property("news_title");
          expect(response.body.result[0]).have.property("news_content");
          expect(response.body.result[0]).have.property("news_image");
          expect(response.body.result[0]).have.property(
            "news_image_description"
          );
          expect(response.body.result[0]).have.property("news_category");
          expect(response.body.result[0]).have.property("news_author");
          expect(response.body.result[0]).have.property("date_created");
          expect(response.body.result[0]).have.property("date_updated");
          expect(response.body.result[0]).have.property("news_category_name");
          expect(response.body.result[0]).have.property("user_name");
          done();
        });
    });
  }),
    describe("/GET news", () => {
      it("It should GET All news", (done) => {
        checkNewsTitle(data.news_title);
        chai
          .request(api)
          .get("/")
          .end((error, response) => {
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body).to.have.property("total_data");
            expect(response.body).to.have.property("total_pages");
            expect(response.body).to.have.property("result");
            done();
          });
      }),
        it("It should GET Search news_title and news_category", (done) => {
          chai
            .request(api)
            .get(
              `/?news_category=${data.news_category}&news_title=${data.news_title}`
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
                "news_title"
              );
              expect(response.body.result[index]).to.have.property(
                "news_content"
              );
              expect(response.body.result[index]).to.have.property(
                "news_image"
              );
              expect(response.body.result[index]).to.have.property(
                "news_image_description"
              );
              expect(response.body.result[index]).to.have.property(
                "news_category"
              );
              expect(response.body.result[index]).to.have.property(
                "news_author"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "news_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        }),
        it("It should GET Search news sort_by, order_by, limit, page", (done) => {
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
                "news_title"
              );
              expect(response.body.result[index]).to.have.property(
                "news_content"
              );
              expect(response.body.result[index]).to.have.property(
                "news_image"
              );
              expect(response.body.result[index]).to.have.property(
                "news_image_description"
              );
              expect(response.body.result[index]).to.have.property(
                "news_category"
              );
              expect(response.body.result[index]).to.have.property(
                "news_author"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "news_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        }),
        it("It should GET detail news", (done) => {
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
                .to.have.property("news_title")
                .equal(data.news_title);
              expect(response.body.result[index])
                .to.have.property("news_content")
                .equal(data.news_content);
              expect(response.body.result[index]).to.have.property(
                "news_image"
              );
              expect(response.body.result[index])
                .to.have.property("news_image_description")
                .equal(data.news_image_description);
              expect(response.body.result[index])
                .to.have.property("news_category")
                .equal(data.news_category);
              expect(response.body.result[index])
                .to.have.property("news_author")
                .equal(data.news_author);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "news_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        });
    }),
    describe("/PATCH news", () => {
      it("It should PATCH news with upload image", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .patch("/" + id)
          .field("news_title", newData.news_title)
          .field("news_content", newData.news_content)
          .attach(
            "news_image",
            fileSystem.readFileSync(news_image),
            "default-profile-images.png"
          )
          .field("news_image_description", newData.news_image_description)
          .field("news_category", newData.news_category)
          .field("news_author", newData.news_author)
          .end((error, response) => {
            let index = getIndex(response.body.result);
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body.result[index])
              .to.have.property("id")
              .equal(global[0].id);
            expect(response.body.result[index])
              .to.have.property("news_title")
              .equal(newData.news_title);
            expect(response.body.result[index])
              .to.have.property("news_content")
              .equal(newData.news_content);
            expect(response.body.result[index]).to.have.property("news_image");
            expect(response.body.result[index])
              .to.have.property("news_image_description")
              .equal(newData.news_image_description);
            expect(response.body.result[index])
              .to.have.property("news_category")
              .equal(newData.news_category);
            expect(response.body.result[index])
              .to.have.property("news_author")
              .equal(newData.news_author);
            expect(response.body.result[index]).to.have.property(
              "date_created"
            );
            expect(response.body.result[index]).to.have.property(
              "date_updated"
            );
            expect(response.body.result[index]).to.have.property(
              "news_category_name"
            );
            expect(response.body.result[index]).to.have.property("user_name");
            done();
          });
      }),
        it("It should PATCH news without upload image", (done) => {
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
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("news_title")
                .equal(newData.news_title);
              expect(response.body.result[index])
                .to.have.property("news_content")
                .equal(newData.news_content);
              expect(response.body.result[index]).to.have.property(
                "news_image"
              );
              expect(response.body.result[index])
                .to.have.property("news_image_description")
                .equal(newData.news_image_description);
              expect(response.body.result[index])
                .to.have.property("news_category")
                .equal(newData.news_category);
              expect(response.body.result[index])
                .to.have.property("news_author")
                .equal(newData.news_author);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "news_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        });
    }),
    describe("/DELETE news", () => {
      it("It should DELETE news", (done) => {
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
