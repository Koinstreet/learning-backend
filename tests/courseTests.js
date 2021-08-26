import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import courseRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('courseRoutes Tests POST and GET route', () => {
    it('Get all courses',  async() => {
        const res = await chai.request(courseRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get courses by id',  async() => {
        const id = '60f5f099f1b4e452ec6a841f';
        const res = await chai.request(courseRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
    
    it('Get courses by id and module',  async() => {
        const id = '60f5f099f1b4e452ec6a841f';
        const res = await chai.request(courseRoutes).get('/').send(id + '/module');
            expect(res.status).to.be.equal(200);
    });  
});