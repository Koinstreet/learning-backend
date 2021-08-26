import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mentorshipRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('Mentorship Tests POST and GET route', () => {

    it('Get Mentorship by id',  async() => {
        const id = '60eff263996c09002a6a2608';
        const res = await chai.request(mentorshipRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});