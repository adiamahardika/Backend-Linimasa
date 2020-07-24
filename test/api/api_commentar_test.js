const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const faker = require("faker");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/commentar`;
const checkCommentar = (commentar) => {
  connection.query(
    `SELECT * FROM commentar_table WHERE commentar = ?`,
    commentar,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const data = {
  news_id: faker.random.uuid(),
  user_id: faker.random.uuid(),
  commentar: faker.random.words(),
};
const newData = {
  commentar: faker.random.words(),
};

describe("Commentar API", () => {
  describe("/POST commentar", () => {
    it("It should POST a new commentar", (done) => {
      chai
        .request(api)
        .post("/")
        .send(data)
        .end((error, response) => {
          expect(response.body).to.be.a("Object");
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0]).to.have.property("news_id");
          expect(response.body.result[0]).to.have.property("user_id");
          expect(response.body.result[0]).to.have.property("commentar");
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          expect(response.body.result[0]).to.have.property("news_title");
          expect(response.body.result[0]).to.have.property("user_name");
          done();
        });
    });
  }),
    describe("/GET commentar", () => {
      it("It should GET all commentar", (done) => {
        checkCommentar(data.commentar);
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
        it("It should GET search commentar by user_id, news_id, and commentar", (done) => {
          chai
            .request(api)
            .get(
              `/??user_id=${data.user_id}&news_id=${data.news_id}&commentar=${data.commentar}`
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
                .to.have.property("news_id")
                .equal(data.news_id);
              expect(response.body.result[index])
                .to.have.property("user_id")
                .equal(data.user_id);
              expect(response.body.result[index])
                .to.have.property("commentar")
                .equal(data.commentar);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "news_title"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        }),
        it("It should GET detail commentar", (done) => {
          const id = global[0].id;
          chai
            .request(api)
            .get("/" + id)
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");
              expect(response.body.result[index])
                .to.have.property("id")
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("news_id")
                .equal(data.news_id);
              expect(response.body.result[index])
                .to.have.property("user_id")
                .equal(data.user_id);
              expect(response.body.result[index])
                .to.have.property("commentar")
                .equal(data.commentar);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "news_title"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        });
    }),
    describe("/PATCH commentar", () => {
      it("It should GET detail commentar", (done) => {
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
              .to.have.property("news_id")
              .equal(data.news_id);
            expect(response.body.result[index])
              .to.have.property("user_id")
              .equal(data.user_id);
            expect(response.body.result[index])
              .to.have.property("commentar")
              .equal(newData.commentar);
            expect(response.body.result[index]).to.have.property(
              "date_created"
            );
            expect(response.body.result[index]).to.have.property(
              "date_updated"
            );
            expect(response.body.result[index]).to.have.property("news_title");
            expect(response.body.result[index]).to.have.property("user_name");
            done();
          });
      });
    }),
    describe("/DELETE commentar", () => {
      it("It should DELETE commentar", (done) => {
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
