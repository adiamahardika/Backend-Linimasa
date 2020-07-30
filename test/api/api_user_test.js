const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const fileSystem = require("fs");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const faker = require("faker");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/user`;
const checkUserEmail = (user_email) => {
  connection.query(
    `SELECT * FROM user_table WHERE user_email = ?`,
    user_email,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const tokenList = {};
const user_image =
  "../backend_lensajabar/assets/upload/images/profile/default-profile-images.png";
const data = {
  user_name: faker.name.findName(),
  user_email: faker.internet.email(),
  user_password: faker.random.word(),
  user_role: faker.random.word(),
  user_birth_date: `20 Januari 2000`,
  user_phone_number: faker.phone.phoneNumber(),
};
const newData = {
  user_name: faker.name.findName(),
  user_email: faker.internet.email(),
  user_password: faker.random.word(),
  user_role: faker.random.word(),
  user_birth_date: `20 Januari 2001`,
  user_phone_number: faker.phone.phoneNumber(),
};
const login = {
  user_email: data.user_email,
  user_password: data.user_password,
};
const pagination = {
  limit: 1,
  page: 1,
};
describe("User API", () => {
  describe("/POST user", () => {
    it("It should Register a new user", (done) => {
      chai
        .request(api)
        .post("/register")
        .field("user_name", data.user_name)
        .field("user_email", data.user_email)
        .field("user_password", data.user_password)
        .field("user_role", data.user_role)
        .field("user_birth_date", data.user_birth_date)
        .field("user_phone_number", data.user_phone_number)
        .attach(
          "user_image",
          fileSystem.readFileSync(user_image),
          "default-profile-images.png"
        )
        .end((error, response) => {
          expect(response.body).to.be.a("Object");
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0]).to.have.property("user_name");
          expect(response.body.result[0]).to.have.property("user_email");
          expect(response.body.result[0]).to.have.property("user_password");
          expect(response.body.result[0]).to.have.property("user_salt");
          expect(response.body.result[0]).to.have.property("user_role");
          expect(response.body.result[0]).to.have.property("user_birth_date");
          expect(response.body.result[0]).to.have.property("user_phone_number");
          expect(response.body.result[0]).to.have.property("user_points");
          expect(response.body.result[0]).to.have.property("user_image");
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          expect(response.body.result[0]).to.have.property("user_role_name");
          done();
        });
    }),
      it("It should Login user", (done) => {
        chai
          .request(api)
          .post("/login")
          .send(login)
          .end((error, response) => {
            tokenList[0] = response.body.result;
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body.result).to.have.property("id");
            expect(response.body.result).to.have.property("user_name");
            expect(response.body.result).to.have.property("user_email");
            expect(response.body.result).to.have.property("user_role");
            expect(response.body.result).to.have.property("token");
            expect(response.body.result).to.have.property("refresh_token");
            done();
          });
      }),
      it("It should Refresh new token", () => {
        const refreshToken = {
          user_email : data.user_email,
          refresh_token : tokenList[0].refresh_token
        }
        chai
          .request(api)
          .post("/token")
          .send(refreshToken)
          .end((error, response) => {
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body.result).to.have.property(
              "id"
            );
            expect(response.body.result).to.have.property(
              "user_name"
            );
            expect(response.body.result).to.have.property(
              "user_email"
            );
            expect(response.body.result).to.have.property(
              "user_role"
            );
            expect(response.body.result).to.have.property(
              "token"
            );
            expect(response.body.result)
              .to.have.property("refresh_token")
              .equal(tokenList[0].refresh_token);
          });
      });
  }),
    describe("/GET User", () => {
      it("It should GET All user", (done) => {
        checkUserEmail(data.user_email);
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
        it("It should GET Search user_name and user_role", (done) => {
          chai
            .request(api)
            .get(`/??user_role=${data.user_role}&user_name=${data.user_name}`)
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("total_data");
              expect(response.body).to.have.property("total_pages");
              expect(response.body).to.have.property("result");
              expect(response.body.result[index]).to.have.property("id");
              expect(response.body.result[index]).to.have.property("user_name");
              expect(response.body.result[index]).to.have.property(
                "user_email"
              );
              expect(response.body.result[index]).to.have.property(
                "user_password"
              );
              expect(response.body.result[index]).to.have.property("user_salt");
              expect(response.body.result[index]).to.have.property("user_role");
              expect(response.body.result[index]).to.have.property(
                "user_birth_date"
              );
              expect(response.body.result[index]).to.have.property(
                "user_phone_number"
              );
              expect(response.body.result[index]).to.have.property(
                "user_points"
              );
              expect(response.body.result[index]).to.have.property(
                "user_image"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "user_role_name"
              );
              done();
            });
        }),
        it("It should GET user sort_by, order_by, limit, page", (done) => {
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
              expect(response.body.result[index]).to.have.property("user_name");
              expect(response.body.result[index]).to.have.property(
                "user_email"
              );
              expect(response.body.result[index]).to.have.property(
                "user_password"
              );
              expect(response.body.result[index]).to.have.property("user_salt");
              expect(response.body.result[index]).to.have.property("user_role");
              expect(response.body.result[index]).to.have.property(
                "user_birth_date"
              );
              expect(response.body.result[index]).to.have.property(
                "user_phone_number"
              );
              expect(response.body.result[index]).to.have.property(
                "user_points"
              );
              expect(response.body.result[index]).to.have.property(
                "user_image"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "user_role_name"
              );
              done();
            });
        }),
        it("It should GET Detail user", (done) => {
          const id = global[0].id;
          chai
            .request(api)
            .get(`/` + id)
            .end((error, response) => {
              let index = getIndex(response.body.result);
              expect(response.body).to.be.a("Object");
              expect(response.body).to.have.status(200);
              expect(response.body).to.have.property("total_data");
              expect(response.body).to.have.property("total_pages");
              expect(response.body).to.have.property("result");
              expect(response.body.result[index])
                .to.have.property("id")
                .equal(global[0].id);
              expect(response.body.result[index])
                .to.have.property("user_name")
                .equal(data.user_name);
              expect(response.body.result[index])
                .to.have.property("user_email")
                .equal(data.user_email);
              expect(response.body.result[index]).to.have.property(
                "user_password"
              );
              expect(response.body.result[index]).to.have.property("user_salt");
              expect(response.body.result[index])
                .to.have.property("user_role")
                .equal(data.user_role);
              expect(response.body.result[index]).to.have.property(
                "user_birth_date"
              );
              expect(response.body.result[index])
                .to.have.property("user_phone_number")
                .equal(data.user_phone_number);
              expect(response.body.result[index]).to.have.property(
                "user_points"
              );
              expect(response.body.result[index]).to.have.property(
                "user_image"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "user_role_name"
              );
              done();
            });
        });
    }),
    describe("/PATCH User", () => {
      it("It should PATCH user with upload image", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .patch("/" + id)
          .field("user_name", newData.user_name)
          .field("user_email", newData.user_email)
          .field("user_password", newData.user_password)
          .field("user_role", newData.user_role)
          .field("user_birth_date", newData.user_birth_date)
          .field("user_phone_number", newData.user_phone_number)
          .attach(
            "user_image",
            fileSystem.readFileSync(user_image),
            "default-profile-images.png"
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
              .to.have.property("user_name")
              .equal(newData.user_name);
            expect(response.body.result[index])
              .to.have.property("user_email")
              .equal(newData.user_email);
            expect(response.body.result[index]).to.have.property(
              "user_password"
            );
            expect(response.body.result[index]).to.have.property("user_salt");
            expect(response.body.result[index])
              .to.have.property("user_role")
              .equal(newData.user_role);
            expect(response.body.result[index]).to.have.property(
              "user_birth_date"
            );
            expect(response.body.result[index])
              .to.have.property("user_phone_number")
              .equal(newData.user_phone_number);
            expect(response.body.result[index]).to.have.property("user_points");
            expect(response.body.result[index]).to.have.property("user_image");
            expect(response.body.result[index]).to.have.property(
              "date_created"
            );
            expect(response.body.result[index]).to.have.property(
              "date_updated"
            );
            expect(response.body.result[index]).to.have.property(
              "user_role_name"
            );
            done();
          });
      }),
        it("It should PATCH user without upload image", (done) => {
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
                .to.have.property("user_name")
                .equal(newData.user_name);
              expect(response.body.result[index])
                .to.have.property("user_email")
                .equal(newData.user_email);
              expect(response.body.result[index]).to.have.property(
                "user_password"
              );
              expect(response.body.result[index]).to.have.property("user_salt");
              expect(response.body.result[index])
                .to.have.property("user_role")
                .equal(newData.user_role);
              expect(response.body.result[index]).to.have.property(
                "user_birth_date"
              );
              expect(response.body.result[index])
                .to.have.property("user_phone_number")
                .equal(newData.user_phone_number);
              expect(response.body.result[index]).to.have.property(
                "user_points"
              );
              expect(response.body.result[index]).to.have.property(
                "user_image"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "user_role_name"
              );
              done();
            });
        });
    }),
    describe("/DELETE user", () => {
      it("It should DELETE user", (done) => {
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
