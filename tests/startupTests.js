import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import startupRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('startupRoutes Tests POST and GET route', () => {
    it('Get all startupRoutes',  async() => {
        const res = await chai.request(startupRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get startupRoutes by id',  async() => {
        const id = '60ca4c75620570082453fc34';
        const res = await chai.request(startupRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});