import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import proposalRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('proposal Tests POST and GET route', () => {
    it('Get all proposal',  async() => {
        const res = await chai.request(proposalRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get proposal by id',  async() => {
        const id = '60de176486627e34ced187ca';
        const res = await chai.request(proposalRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});