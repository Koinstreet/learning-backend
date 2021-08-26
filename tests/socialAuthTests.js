import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import socialRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('socialAuth Tests POST and GET route', () => {
    it('Get Google Authenticate',  async() => {
        const res = await chai.request(socialRoutes).get('/auth/google');
            expect(res.status).to.be.equal(200);
    });  

    it('Get Google Authenticate Redirect',  async() => {
        const res = await chai.request(socialRoutes).get('/auth/google/redirect');
            expect(res.status).to.be.equal(200);
    });  
    it('Get Logout Google',  async() => {
        const res = await chai.request(socialRoutes).get('/auth/logout');
            expect(res.status).to.be.equal(200);
    });  
    it('Get Facebook Authenticate',  async() => {
        const res = await chai.request(socialRoutes).get('/auth/facebook');
            expect(res.status).to.be.equal(200);
    });  
    it('Get Facebook callback',  async() => {
        const res = await chai.request(socialRoutes).get('/auth/facebook/callback');
            expect(res.status).to.be.equal(200);
    });  
    it('Get Github Authenticate',  async() => {
        const res = await chai.request(socialRoutes).get('/auth/github');
            expect(res.status).to.be.equal(200);
    });  
    it('Get Github callback',  async() => {
        const res = await chai.request(socialRoutes).get('/auth/github/callback');
            expect(res.status).to.be.equal(200);
    });  
    it('Get LinkedIN authentucate',  async() => {
        const res = await chai.request(socialRoutes).get('/auth/linkedin');
            expect(res.status).to.be.equal(200);
    });  
    it('Get LinkedIn callback',  async() => {
        const res = await chai.request(socialRoutes).get('/auth/linkedin/callback');
            expect(res.status).to.be.equal(200);
    });  
    
});