const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const faker = require("faker");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/job-vacancy`;
const checkJobVacancy = (job_vacancy_title) => {
  connection.query(
    `SELECT * FROM job_vacancy_table WHERE job_vacancy_title = ?`,
    job_vacancy_title,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const data = {
  job_vacancy_title: faker.lorem.word(),
  job_vacancy_company: faker.company.companyName(),
  job_vacancy_location: faker.address.streetAddress(),
  job_vacancy_salary_start: parseInt(faker.commerce.price()),
  job_vacancy_salary_end: parseInt(faker.commerce.price()),
  job_vacancy_category: faker.random.word(),
  job_vacancy_jobdesk: faker.lorem.paragraph(),
  job_vacancy_requirements: faker.lorem.paragraph(),
  job_vacancy_deadline: faker.date.future(),
  job_vacancy_city: faker.address.city(),
  job_vacancy_author: faker.name.findName(),
};
const newData = {
  job_vacancy_title: faker.lorem.word(),
  job_vacancy_company: faker.company.companyName(),
  job_vacancy_location: faker.address.streetAddress(),
  job_vacancy_salary_start: parseInt(faker.commerce.price()),
  job_vacancy_salary_end: parseInt(faker.commerce.price()),
  job_vacancy_category: faker.random.word(),
  job_vacancy_jobdesk: faker.lorem.paragraph(),
  job_vacancy_requirements: faker.lorem.paragraph(),
  job_vacancy_deadline: faker.date.future(),
  job_vacancy_city: faker.address.city(),
  job_vacancy_author: faker.name.findName(),
};
const pagination = {
  limit: 1,
  page: 1,
};
describe("Job Vacancy API", () => {
  describe("/POST job vacancy", () => {
    it("It should POST a new job vacancy", (done) => {
      chai
        .request(api)
        .post("/")
        .send(data)
        .end((error, response) => {
          expect(response.body).to.be.a("Object");
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0]).to.have.property("job_vacancy_title");
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_company"
          );
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_location"
          );
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_salary_start"
          );
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_salary_end"
          );
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_category"
          );
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_jobdesk"
          );
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_requirements"
          );
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_deadline"
          );
          expect(response.body.result[0]).to.have.property("job_vacancy_city");
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_author"
          );
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          expect(response.body.result[0]).to.have.property(
            "job_vacancy_category_name"
          );
          expect(response.body.result[0]).to.have.property("user_name");
          done();
        });
    });
  }),
    describe("/GET job vacancy", () => {
      it("It should GET all job vacancy", (done) => {
        checkJobVacancy(data.job_vacancy_title);
        chai
          .request(api)
          .get("/")
          .end((error, response) => {
            expect(response.body).to.be.a("object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("total_data");
            expect(response.body).to.have.property("total_pages");
            expect(response.body).to.have.property("result");
            done();
          });
      }),
        it("It should GET Search job_vacancy_title, job_vacancy_category, job_vacancy_city", (done) => {
          chai
            .request(api)
            .get(
              `/?job_vacancy_category=${data.job_vacancy_category}&job_vacancy_title=${data.job_vacancy_title}&job_vacancy_city=${data.job_vacancy_city}`
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
                "job_vacancy_title"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_company"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_location"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_salary_start"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_salary_end"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_category"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_jobdesk"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_requirements"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_deadline"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_city"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_author"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        }),
        it("It should GET job vacancy sort_by, order_by, limit, page", (done) => {
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
                "job_vacancy_title"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_company"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_location"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_salary_start"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_salary_end"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_category"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_jobdesk"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_requirements"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_deadline"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_city"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_author"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        }),
        it("It should GET detail job vacancy", (done) => {
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
                .to.have.property("job_vacancy_title")
                .equal(data.job_vacancy_title);
              expect(response.body.result[index])
                .to.have.property("job_vacancy_company")
                .equal(data.job_vacancy_company);
              expect(response.body.result[index])
                .to.have.property("job_vacancy_location")
                .equal(data.job_vacancy_location);
              expect(response.body.result[index])
                .to.have.property("job_vacancy_salary_start")
                .equal(data.job_vacancy_salary_start);
              expect(response.body.result[index])
                .to.have.property("job_vacancy_salary_end")
                .equal(data.job_vacancy_salary_end);
              expect(response.body.result[index])
                .to.have.property("job_vacancy_category")
                .equal(data.job_vacancy_category);
              expect(response.body.result[index])
                .to.have.property("job_vacancy_jobdesk")
                .equal(data.job_vacancy_jobdesk);
              expect(response.body.result[index])
                .to.have.property("job_vacancy_requirements")
                .equal(data.job_vacancy_requirements);
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_deadline"
              );
              expect(response.body.result[index])
                .to.have.property("job_vacancy_city")
                .equal(data.job_vacancy_city);
              expect(response.body.result[index])
                .to.have.property("job_vacancy_author")
                .equal(data.job_vacancy_author);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "job_vacancy_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        });
    }),
    describe("/PATCH job vacancy", () => {
      it("It should PATCH job vacancy", (done) => {
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
              .to.have.property("job_vacancy_title")
              .equal(newData.job_vacancy_title);
            expect(response.body.result[index])
              .to.have.property("job_vacancy_company")
              .equal(newData.job_vacancy_company);
            expect(response.body.result[index])
              .to.have.property("job_vacancy_location")
              .equal(newData.job_vacancy_location);
            expect(response.body.result[index])
              .to.have.property("job_vacancy_salary_start")
              .equal(newData.job_vacancy_salary_start);
            expect(response.body.result[index])
              .to.have.property("job_vacancy_salary_end")
              .equal(newData.job_vacancy_salary_end);
            expect(response.body.result[index])
              .to.have.property("job_vacancy_category")
              .equal(newData.job_vacancy_category);
            expect(response.body.result[index])
              .to.have.property("job_vacancy_jobdesk")
              .equal(newData.job_vacancy_jobdesk);
            expect(response.body.result[index])
              .to.have.property("job_vacancy_requirements")
              .equal(newData.job_vacancy_requirements);
            expect(response.body.result[index]).to.have.property(
              "job_vacancy_deadline"
            );
            expect(response.body.result[index])
              .to.have.property("job_vacancy_city")
              .equal(newData.job_vacancy_city);
            expect(response.body.result[index])
              .to.have.property("job_vacancy_author")
              .equal(newData.job_vacancy_author);
            expect(response.body.result[index]).to.have.property(
              "date_created"
            );
            expect(response.body.result[index]).to.have.property(
              "date_updated"
            );
            expect(response.body.result[index]).to.have.property(
              "job_vacancy_category_name"
            );
            expect(response.body.result[index]).to.have.property("user_name");
            done();
          });
      });
    }),
    describe("/DELETE job vacancy", () => {
      it("It should DELETE job vacancy", (done) => {
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
