const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const chaiaspromise = require("chai-as-promised");

chai.use(chaiHttp);
chai.use(chaiaspromise);

let x = {};
const api = `${ip}/news-category`;
const checkNewsCategoryName = (news_category_name) => {
  connection.query(
    `SELECT * FROM news_category_table WHERE news_category_name = ?`,
    news_category_name,
    (error, result) => {
      return (x[0] = result[0]);
    }
  );
};

const data = {
  news_category_name: "aaaaa",
};
const newData = {
  news_category_name: "aaaaaaaaaa",
};

describe("connection", () => {
  beforeEach((done) => {
    connection.remove({}, (error) => {
      done();
    });
  });
});
describe("News Category API", () => {
  describe("/POST news category", () => {
    it("It should POST a new news category", (done) => {
      chai
        .request(api)
        .post("/")
        .send(data)
        .end((error, response) => {
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0])
            .to.have.property("news_category_name")
            .equal(data.news_category_name);
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          done();
        });
    });
  }),
    describe("/GET news category", () => {
      it("It should GET all news category", (done) => {
        checkNewsCategoryName(data.news_category_name),
          chai
            .request(api)
            .get("/")
            .end((error, response) => {
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");
              expect(response.body.result[0]).to.have.property("id");
              expect(response.body.result[0])
                .to.have.property("news_category_name")
              expect(response.body.result[0]).to.have.property("date_created");
              expect(response.body.result[0]).to.have.property("date_updated");
              done();
            });
      }),
        it("It should GET search news category name", (done) => {
          checkNewsCategoryName(data.news_category_name),
            chai
              .request(api)
              .get(`/?search_category_name=${data.news_category_name}`)
              .end((error, response) => {
                expect(response.body).to.have.status(200);
                expect(response.body).to.have.property("result");
                expect(response.body.result[0]).to.have.property("id");
                expect(response.body.result[0])
                  .to.have.property("news_category_name")
                  .equal(data.news_category_name);
                expect(response.body.result[0]).to.have.property(
                  "date_created"
                );
                expect(response.body.result[0]).to.have.property(
                  "date_updated"
                );
                done();
              });
        }),
        it("It should GET detail news category", async () => {
          const id = await x[0].id;
          chai
            .request(api)
            .patch("/" + id)
            .end((error, response) => {
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");
              expect(response.body.result[0]).to.have.property("id");
              expect(response.body.result[0]).to.have.property(
                "news_category_name"
              );
              expect(response.body.result[0]).to.have.property("date_created");
              expect(response.body.result[0]).to.have.property("date_updated");
            });
        });
    }),
    describe("/PATCH news category", () => {
      it("It should PATCH news category", async () => {
        const id = await x[0].id;
        chai
          .request(api)
          .patch("/" + id)
          .send(newData)
          .end((error, response) => {
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body.result[0]).to.have.property("id");
            expect(response.body.result[0])
              .to.have.property("news_category_name")
              .equal(newData.news_category_name);
            expect(response.body.result[0]).to.have.property("date_created");
            expect(response.body.result[0]).to.have.property("date_updated");
          });
      });
    }),
    describe("/DELETE news category", () => {
      it("It should DELETE news category", async () => {
        const id = await x[0].id;
        chai
          .request(api)
          .delete("/" + id)
          .end((error, response) => {
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
          });
      });
    });
});
