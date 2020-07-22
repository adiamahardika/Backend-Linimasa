const connection = require('../../src/configs/mysql')
const {ip} = require('../../src/configs/index')
const fs = require('fs')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const faker = require('faker')
const Sinon = require('sinon')
const newsCategory = require('../../src/controllers/news_category')

chai.use(chaiHttp)

const data = {
    news_category_name: faker.random.word(),
}
describe('News Category Controllers', () => {
    describe('Insert News Category', () => {
        it('It should insert a new news category', (done) => {
            newsCategory.insertNewsCategory(data)
            })
        })
    }),
    describe.skip('Can get news', () => {
        it('Get all news', (done) => {
            chai.request(`${ip}/news`)
            .get('/')
            .end((error, response) => {
                expect(response.body).to.have.status(200)
                expect(response.body).to.have.property('result')
                expect(response.body).to.have.property('total_data')
                done()
            })
        })
    })