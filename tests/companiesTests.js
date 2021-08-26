import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import companiesRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('companiesRoutes Tests POST and GET route', () => {
    it('Get all companies',  async() => {
        const res = await chai.request(companiesRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get companies by id',  async() => {
        const id = '60f1b3bd0739be002a24dcb0';
        const res = await chai.request(companiesRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});