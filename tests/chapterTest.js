import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chapterRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('Chapter Tests POST and GET route', () => {
    it('Get all chapters',  async() => {
        const res = await chai.request(chapterRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get chapters by id',  async() => {
        const id = '60eff79c996c09002a6a260b';
        const res = await chai.request(chapterRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});