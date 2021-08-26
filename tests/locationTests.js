import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import locationRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('Location Tests POST and GET route', () => {
    it('Get all locations',  async() => {
        const res = await chai.request(locationRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get locations by id',  async() => {
        const id = '611a686389b515002bd9aa60';
        const res = await chai.request(locationRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});