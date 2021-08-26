import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import minorityEarnedRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('minorityEarned Tests POST and GET route', () => {
    it('Get all minorityEarnedRoutes',  async() => {
        const res = await chai.request(minorityEarnedRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get minorityEarned by id',  async() => {
        const id = '60e48fd74a098f002a2a460c';
        const res = await chai.request(minorityEarnedRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});