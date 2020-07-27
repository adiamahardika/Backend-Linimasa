const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const faker = require("faker");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/job-vacancy-category`;
const checkJobVacancyCategory = (job_vacancy_category_name) => {
  connection.query(
    `SELECT * FROM job_vacancy_category_table WHERE job_vacancy_category_name = ?`,
    job_vacancy_category_name,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const data = {
  job_vacancy_category_name: faker.random.word(),
};
const newData = {
  job_vacancy_category_name: faker.random.word(),
};

describe("Job Vacancy Category API", () => {
  describe("/POST job vacancy category", () => {
    it("It should POST a new job vacancy category", (done) => {
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
            "job_vacancy_category_name"
          );
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          done();
        });
    });
  }),
    describe("/GET job vacancy category", () => {
      it("It should GET all job vacancy category", (done) => {
        checkJobVacancyCategory(data.job_vacancy_category_name);
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
        it("It should GET search job vacancy category name", (done) => {
          chai
            .request(api)
            .get(`/?job_vacancy_category_name=${data.job_vacancy_category_name}`)
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("result");
              expect(response.body.result[index])
                .to.have.property("id")
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("job_vacancy_category_name")
                .equal(data.job_vacancy_category_name);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[0]).to.have.property("date_updated");
              done();
            });
        });
    }),
    describe("/PATCH job vacancy category", () => {
      it("It should PATCH job vacancy category", (done) => {
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
              .to.have.property("job_vacancy_category_name")
              .equal(newData.job_vacancy_category_name);
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
    describe("/DELETE job vacancy category", () => {
      it("It should DELETE job vacancy category", (done) => {
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
