import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import eventRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('Events Tests POST and GET route', () => {
    it('Get all EVENTS',  async() => {
        const res = await chai.request(eventRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get EVENTS by id',  async() => {
        const id = '6112e0fe859f38002af08f14';
        const res = await chai.request(eventRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});