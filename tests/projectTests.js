import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import projectRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('project Tests POST and GET route', () => {
    it('Get all project',  async() => {
        const res = await chai.request(projectRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get project by id',  async() => {
        const id = '60a7c2ad52dba8904f5535d1';
        const res = await chai.request(projectRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});