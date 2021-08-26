import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import savedJobsRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('savedJobsRoutes Tests POST and GET route', () => {
    it('Get all savedJobs',  async() => {
        const res = await chai.request(savedJobsRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get savedJobs by id',  async() => {
        const id = '61277bf91f98c0002bfbaf7c';
        const res = await chai.request(savedJobsRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
    it('Get UserJobs',  async() => {
        const id = '61277bf91f98c0002bfbaf7c';
        const res = await chai.request(savedJobsRoutes).get('/userJobs');
            expect(res.status).to.be.equal(200);
    });  
});