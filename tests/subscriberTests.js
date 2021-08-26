import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import subscriberRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('subscriberRoutes Tests POST and GET route', () => {
    it('Get all subscriber',  async() => {
        const res = await chai.request(subscriberRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('POST subscriber ',  async() => {
        const res = await chai.request(subscriberRoutes).post('/api/v1/subscribe').send({email: "sharjeel@gmail.com"});
            expect(res.status).to.be.equal(200);
    });  
});