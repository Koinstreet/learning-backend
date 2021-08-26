import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chatMessageRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('chatMessageRoutes Tests POST and GET route', () => {

    it('Get chatMessageRoutes by id',  async() => {
        const id = '610029790f7852002aac8f37';
        const res = await chai.request(chatMessageRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});