const connection = require("../../src/configs/mysql");
const { ip } = require("../../src/configs/index");
const chai = require("chai");
const expect = require("chai").expect;
const faker = require("faker");
const chaiHttp = require("chai-http");
const fileSystem = require("fs");

chai.use(chaiHttp);

let global = {};
const api = `${ip}/iklan-baris`;
const checkIklanBarisTitle = (iklan_baris_title) => {
  connection.query(
    `SELECT * FROM iklan_baris_table WHERE iklan_baris_title = ?`,
    iklan_baris_title,
    (error, result) => {
      return (global[0] = result[0]);
    }
  );
};
const getIndex = (result) => {
  return result.findIndex((x) => x.id === global[0].id);
};
const iklan_baris_image = "../backend_lensajabar/assets/upload/images/profile/default-profile-images.png"
const data = {
  iklan_baris_title: faker.lorem.words(),
  iklan_baris_image,
  iklan_baris_description: faker.lorem.paragraph(),
  iklan_baris_price: parseInt(faker.commerce.price()),
  iklan_baris_category: faker.random.word(),
  iklan_baris_author: faker.name.findName(),
  iklan_baris_contact: faker.phone.phoneNumber(),
  iklan_baris_address: faker.address.streetAddress(),
  iklan_baris_province: faker.address.country(),
  iklan_baris_city: faker.address.city(),
  iklan_baris_sub_district: faker.address.county(),
};
const newData = {
  iklan_baris_title: faker.lorem.words(),
  iklan_baris_image,
  iklan_baris_description: faker.lorem.paragraph(),
  iklan_baris_price: parseInt(faker.commerce.price()),
  iklan_baris_category: faker.random.word(),
  iklan_baris_author: faker.name.findName(),
  iklan_baris_contact: faker.phone.phoneNumber(),
  iklan_baris_address: faker.address.streetAddress(),
  iklan_baris_province: faker.address.country(),
  iklan_baris_city: faker.address.city(),
  iklan_baris_sub_district: faker.address.county(),
};
const pagination = {
  limit: 1,
  page: 1,
};
describe("Iklan Baris API", () => {
  describe("/POST iklan baris", () => {
    it("It should POST a new iklan baris", (done) => {
      chai
        .request(api)
        .post("/")
        .field("iklan_baris_title", data.iklan_baris_title)
        .attach(
          "iklan_baris_image",
          fileSystem.readFileSync(data.iklan_baris_image),
          "default-profile-images.png"
        )
        .field("iklan_baris_description", data.iklan_baris_description)
        .field("iklan_baris_price", data.iklan_baris_price)
        .field("iklan_baris_category", data.iklan_baris_category)
        .field("iklan_baris_author", data.iklan_baris_author)
        .field("iklan_baris_contact", data.iklan_baris_contact)
        .field("iklan_baris_address", data.iklan_baris_address)
        .field("iklan_baris_province", data.iklan_baris_province)
        .field("iklan_baris_city", data.iklan_baris_city)
        .field("iklan_baris_sub_district", data.iklan_baris_sub_district)
        .end((error, response) => {
          expect(response.body).to.be.a("Object");
          expect(response.body).to.have.status(200);
          expect(response.body).to.have.property("result");
          expect(response.body.result[0]).to.have.property("id");
          expect(response.body.result[0]).to.have.property("iklan_baris_title");
          expect(response.body.result[0]).to.have.property("iklan_baris_image");
          expect(response.body.result[0]).to.have.property(
            "iklan_baris_description"
          );
          expect(response.body.result[0]).to.have.property("iklan_baris_price");
          expect(response.body.result[0]).to.have.property(
            "iklan_baris_category"
          );
          expect(response.body.result[0]).to.have.property(
            "iklan_baris_author"
          );
          expect(response.body.result[0]).to.have.property(
            "iklan_baris_contact"
          );
          expect(response.body.result[0]).to.have.property(
            "iklan_baris_address"
          );
          expect(response.body.result[0]).to.have.property(
            "iklan_baris_province"
          );
          expect(response.body.result[0]).to.have.property("iklan_baris_city");
          expect(response.body.result[0]).to.have.property(
            "iklan_baris_sub_district"
          );
          expect(response.body.result[0]).to.have.property("date_created");
          expect(response.body.result[0]).to.have.property("date_updated");
          expect(response.body.result[0]).to.have.property(
            "iklan_baris_category_name"
          );
          expect(response.body.result[0]).to.have.property("user_name");
          done();
        });
    });
  }),
    describe("/GET iklan baris", () => {
      it("It should GET All iklan baris", (done) => {
        checkIklanBarisTitle(data.iklan_baris_title);
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
        it("It should GET Search iklan_baris_category, iklan_baris_title", (done) => {
          chai
            .request(api)
            .get(
              `/?iklan_baris_category=${data.iklan_baris_category}&iklan_baris_title=${data.iklan_baris_title}`
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
                "iklan_baris_title"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_image"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_description"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_price"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_category"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_author"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_contact"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_address"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_province"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_city"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_sub_district"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        }),
        it("It should GET iklan baris sort_by, order_by, limit, page", (done) => {
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
                "iklan_baris_title"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_image"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_description"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_price"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_category"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_author"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_contact"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_address"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_province"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_city"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_sub_district"
              );
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        }),
        it("It should GET detail iklan baris", (done) => {
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
                .to.have.property("iklan_baris_title")
                .equal(data.iklan_baris_title);
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_image"
              );
              expect(response.body.result[index])
                .to.have.property("iklan_baris_description")
                .equal(data.iklan_baris_description);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_price")
                .equal(data.iklan_baris_price);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_category")
                .equal(data.iklan_baris_category);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_author")
                .equal(data.iklan_baris_author);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_contact")
                .equal(data.iklan_baris_contact);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_address")
                .equal(data.iklan_baris_address);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_province")
                .equal(data.iklan_baris_province);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_city")
                .equal(data.iklan_baris_city);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_sub_district")
                .equal(data.iklan_baris_sub_district);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        });
    }),
    describe("/PATCH iklan baris", () => {
      it("It should PATCH iklan baris with upload image", (done) => {
        const id = global[0].id;
        chai
          .request(api)
          .patch("/" + id)
          .field("iklan_baris_title", newData.iklan_baris_title)
          .attach(
            "iklan_baris_image",
            fileSystem.readFileSync(newData.iklan_baris_image),
            "default-profile-images.png"
          )
          .field("iklan_baris_description", newData.iklan_baris_description)
          .field("iklan_baris_price", newData.iklan_baris_price)
          .field("iklan_baris_category", newData.iklan_baris_category)
          .field("iklan_baris_author", newData.iklan_baris_author)
          .field("iklan_baris_contact", newData.iklan_baris_contact)
          .field("iklan_baris_address", newData.iklan_baris_address)
          .field("iklan_baris_province", newData.iklan_baris_province)
          .field("iklan_baris_city", newData.iklan_baris_city)
          .field("iklan_baris_sub_district", newData.iklan_baris_sub_district)
          .end((error, response) => {
            let index = getIndex(response.body.result);
            expect(response.body).to.be.a("Object");
            expect(response.body).to.have.status(200);
            expect(response.body).to.have.property("result");
            expect(response.body.result[index])
              .to.have.property("id")
              .equal(global[0].id);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_title")
              .equal(newData.iklan_baris_title);
            expect(response.body.result[index]).to.have.property(
              "iklan_baris_image"
            );
            expect(response.body.result[index])
              .to.have.property("iklan_baris_description")
              .equal(newData.iklan_baris_description);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_price")
              .equal(newData.iklan_baris_price);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_category")
              .equal(newData.iklan_baris_category);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_author")
              .equal(newData.iklan_baris_author);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_contact")
              .equal(newData.iklan_baris_contact);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_address")
              .equal(newData.iklan_baris_address);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_province")
              .equal(newData.iklan_baris_province);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_city")
              .equal(newData.iklan_baris_city);
            expect(response.body.result[index])
              .to.have.property("iklan_baris_sub_district")
              .equal(newData.iklan_baris_sub_district);
            expect(response.body.result[index]).to.have.property(
              "date_created"
            );
            expect(response.body.result[index]).to.have.property(
              "date_updated"
            );
            expect(response.body.result[index]).to.have.property(
              "iklan_baris_category_name"
            );
            expect(response.body.result[index]).to.have.property("user_name");
            done();
          });
      }),
        it("It should PATCH iklan baris without upload image", (done) => {
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
                .to.have.property("iklan_baris_title")
                .equal(newData.iklan_baris_title);
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_image"
              );
              expect(response.body.result[index])
                .to.have.property("iklan_baris_description")
                .equal(newData.iklan_baris_description);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_price")
                .equal(newData.iklan_baris_price);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_category")
                .equal(newData.iklan_baris_category);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_author")
                .equal(newData.iklan_baris_author);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_contact")
                .equal(newData.iklan_baris_contact);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_address")
                .equal(newData.iklan_baris_address);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_province")
                .equal(newData.iklan_baris_province);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_city")
                .equal(newData.iklan_baris_city);
              expect(response.body.result[index])
                .to.have.property("iklan_baris_sub_district")
                .equal(newData.iklan_baris_sub_district);
              expect(response.body.result[index]).to.have.property(
                "date_created"
              );
              expect(response.body.result[index]).to.have.property(
                "date_updated"
              );
              expect(response.body.result[index]).to.have.property(
                "iklan_baris_category_name"
              );
              expect(response.body.result[index]).to.have.property("user_name");
              done();
            });
        });
    }),
    describe("/DELETE iklan baris", () => {
      it("It should DELETE iklan baris", (done) => {
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
