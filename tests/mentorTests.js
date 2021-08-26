
import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mentorRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('Mentor Tests POST and GET route', () => {
    it('Get all Mentor',  async() => {
        const res = await chai.request(mentorRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get Mentor by id',  async() => {
        const id = '60eff5d0996c09002a6a260a';
        const res = await chai.request(mentorRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});