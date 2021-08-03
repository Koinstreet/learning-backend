import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { it, describe } = mocha;

chai.expect();
chai.use(chaiHttp);

describe('Testing Server', () => {
  it('Testing Welcome endPoint', async () => {
    const res = await chai.request(server).get('/');
    expect(res.status).to.be.equal(200);
  });

  it('Testing unknown endPoint', async () => {
    const res = await chai.request(server).get('/unknow');
    expect(res.status).to.be.equal(404);
  });
});