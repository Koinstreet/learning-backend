import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chapterStatsRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('ChapterRouters Tests POST and GET route', () => {
    it('Get all ChapterRouters',  async() => {
        const res = await chai.request(chapterStatsRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get ChapterRouters by id',  async() => {
        const id = '610042e6f705ba002a2673a5';
        const res = await chai.request(chapterStatsRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});