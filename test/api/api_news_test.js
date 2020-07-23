const connection = require('../../src/configs/mysql')
const {ip} = require('../../src/configs/index')
const fs = require('fs')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const faker = require('faker')

chai.use(chaiHttp)

describe('connection', () => {
    beforeEach((done) =>{
        connection.remove({}, (error) => {
            done()
        })
    })
})

faker.seed(1234)
const id = faker.random.uuid()
const image = faker.image.image()
const data = {
    id,
    news_title: faker.lorem.sentence() ,
    news_content : faker.lorem.paragraph(),
    news_image_description: faker.lorem.sentences(),
    news_category: faker.lorem.sentence(),
    news_author: faker.name.findName(),
    date_created: faker.date.recent(),
    date_updated: faker.date.recent()
}
describe.skip('News API', () => {
    describe('/POST news', () => {
        it('It should POST a new news', (done) => {
            
            chai.request(`${ip}/news`)
            .post('/')
            .field('id', id)
            .field('news_title', data.news_title)
            .field('news_content', data.news_content)
            .field('news_image_description', data.news_image_description)
            .field('news_category', data.news_category)
            .field('news_author', data.news_author)
            .field('date_created', data.date_created)
            .field('date_updated', data.date_updated)
            .attach('news_image', fs.readFileSync('`http://${ip}/assets/upload/images/news/test.png'),
            'test.png')
            .end((error, response) => {
                expect(response.body).to.have.status(200)
                expect(response.body).to.have.property('result')
                expect(response.body).to.have.property('total_data')
                expect(response.body.result).have.property('id')
                expect(response.body.result).have.property('news_title')
                expect(response.body.result).have.property('news_content')
                expect(response.body.result).have.property('news_images')
                expect(response.body.result).have.property('news_image_description')
                expect(response.body.result).have.property('news_category')
                expect(response.body.result).have.property('news_author')
                expect(response.body.result).have.property('date_created')
                expect(response.body.result).have.property('date_updated')
                done()
            })
        })
    }),
    describe('Can get news', () => {
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
})