const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);

let global = {};
const api = `${ip}/news-category`;
const checkNewsCategoryName = (news_category_name) => {
  connection.query(
    `SELECT * FROM news_category_table WHERE news_category_name = ?`,
    news_category_name,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex(x => x.id === global[0].id)
}
const data = {
  news_category_name: "aaaaa",
};
const newData = {
  news_category_name: "aaaaaaaaaa",
};

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
              let index = getIndex(response.body.result)
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");
              expect(response.body.result[index]).to.have.property("id");
              expect(response.body.result[index])
                .to.have.property("news_category_name")
              expect(response.body.result[index]).to.have.property("date_created");
              expect(response.body.result[index]).to.have.property("date_updated");
              done();
            });
      }),
        it("It should GET search news category name", async() => {
          checkNewsCategoryName(data.news_category_name)
          const id = await global[0].id;
            chai
              .request(api)
              .get(`/?search_category_name=${data.news_category_name}`)
              .end((error, response) => {
                let index = getIndex(response.body.result)
                expect(response.body).to.have.status(200);
                expect(response.body).to.have.property("result");
                expect(response.body.result[index]).to.have.property("id");
                expect(response.body.result[index])
                  .to.have.property("news_category_name")
                  .equal(data.news_category_name);
                expect(response.body.result[index]).to.have.property(
                  "date_created"
                );
                expect(response.body.result[index]).to.have.property(
                  "date_updated"
                );
              });
        }),
        it("It should GET detail news category", async () => {
          const id = await global[0].id;
          chai
            .request(api)
            .patch("/" + id)
            .end((error, response) => {
              let index = getIndex(response.body.result)
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");
              expect(response.body.result[index]).to.have.property("id");
              expect(response.body.result[index]).to.have.property(
                "news_category_name"
              ).equal(data.news_category_name);
              expect(response.body.result[index]).to.have.property("date_created");
              expect(response.body.result[index]).to.have.property("date_updated");
            });
        });
    }),
    describe("/PATCH news category", () => {
      it("It should PATCH news category", async () => {
        const id = await global[0].id;
        chai
          .request(api)
          .patch("/" + id)
          .send(newData)
          .end((error, response) => {
            let index = getIndex(response.body.result)
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body.result[index]).to.have.property("id");
            expect(response.body.result[index])
              .to.have.property("news_category_name")
              .equal(newData.news_category_name);
            expect(response.body.result[index]).to.have.property("date_created");
            expect(response.body.result[index]).to.have.property("date_updated");
          });
      });
    }),
    describe("/DELETE news category", () => {
      it("It should DELETE news category", async () => {
        const id = await global[0].id;
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
