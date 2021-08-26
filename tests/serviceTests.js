import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import serviceRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('serviceRoutes Tests POST and GET route', () => {
    it('Get all Services',  async() => {
        const res = await chai.request(serviceRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    
    it('Get Services by id',  async() => {
        const id = '6125f95da257bb0b2a47a3bb';
        const res = await chai.request(serviceRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});