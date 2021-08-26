import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import userRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('User Tests POST and GET route', () => {
    xit('Signup User POST',  async() => {
        let user = {
            email: "sharjeel@email.com",
            password: "sharjeel",
            confirmPassword: "sharjeel",
            firstName: "sharjeel",
            lastName: "ahmad",
            userName: "sharjeel99",
        } 
        const res = await chai.request(userRoutes).post('/api/v1/user/signup').send(user);
            expect(res.status).to.be.equal(200);
    });  

    xit('Login User POST',  async() => {
        let user = {
            email: "sharjeel@email.com",
            password: "sharjeel",
        } 
        const res = await chai.request(userRoutes).post('/api/v1/user/login').send(user);
            expect(res.status).to.be.equal(200);
    });  
    it('Get all users',  async() => {
        const res = await chai.request(userRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });  

    it('Get by id',  async() => {
        const id = '612734fc4d1dc4002bcfedcf';
        const res = await chai.request(userRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });  
});