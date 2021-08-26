import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jobsRoutes from '../app';
const { it, describe } = mocha;
let should = chai.should();
chai.use(chaiHttp);

describe('Jobs Tests POST and GET route', () => {
    xit('Search for jobs',  async() => {
        const res = await chai.request(jobsRoutes).post('/api/v1/job/search').send({job_title: "Software Engineer"});
            expect(res.status).to.be.equal(201);
    });  

    it('GET all jobs',async () => {   
            const res = await chai.request(jobsRoutes).get('/');
            expect(res.status).to.be.equal(200);
    });

    it('Search for jobs by ID', async() => {
        const id = '60f086483f3ccf002ac00bfc';
        const res = await chai.request(jobsRoutes).get('/').send(id);
            expect(res.status).to.be.equal(200);
    });
    
    it('Search for jobs by incorrect ID', async() => {
        const Iid = '60f086483f3ccf012bc00bfc';
        const res = await chai.request(jobsRoutes).get('/').send(Iid);
            expect(res.status).to.be.equal(200);
    });
 
    xit('Create jobs',async () => {
        let token = '';
        let user = {
            email: "sharjeel@email.com",
            password: "sharjeel",
            confirmPassword: "sharjeel",
            firstName: "sharjeel",
            lastName: "ahmad",
            userName: "sharjeel99",
        } 
        let job =  {
            job_title: "Senior Software",
            application_link: "test",
            job_description: "We are looking for a back-end or full stack developer",
            location: "Fremont, California"
        }
        const res = await  chai.request(jobsRoutes).post('/api/v1/user/signup').send(user);
        token = res.body.data.token;
            expect(res.status).to.be.equal(200);
        const respnse = await  chai.request(jobsRoutes).post('/api/v1/job/').set({ "Authorization": `Bearer ${token}` }).send(job);
            expect(response.status).to.be.equal(200);
    });

    xit('Search for jobs by ID and Update',async () => {
        let Jobs = {
            job_title: "Senior Software",
            application_link: "test",
            job_description: "We are looking for a back-end or full stack developer",
            location: "Fremont, California",
        }
            const res = await chai.request(jobsRoutes).patch('/api/v1/job/60f086483f3ccf002ac00bfc')
            .send({ 
                job_title: "Senior Software",
                application_link: "test",
                job_description: "We are looking for a back-end or full stack developer",
                location: "Fremont, California"}
            );
       
                expect(res.status).to.be.equal(200);
    });
 
    xit('Search for jobs by ID and Delete', async() => {
 
            const res = await chai.request(jobsRoutes).delete('/api/v1/job/').send('608ac99fa287bac91539ba48');
                expect(res.status).to.be.equal(200);
    });
});
