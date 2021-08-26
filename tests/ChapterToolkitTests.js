import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chapterToolKit from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('ChapterToolkit Tests POST and GET route', () => {
    it('Get all ChapterToolkit',  async() => {
        const res = await chai.request(chapterToolKit).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get ChapterToolkit by id',  async() => {
        const id = '610029790f7852002aac8f37';
        const res = await chai.request(chapterToolKit).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});