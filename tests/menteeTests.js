import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import menteeRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('Mentee Tests POST and GET route', () => {
    it('Get all Mentee',  async() => {
        const res = await chai.request(menteeRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get Mentee by id',  async() => {
        const id = '60eff263996c09002a6a2608';
        const res = await chai.request(menteeRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});