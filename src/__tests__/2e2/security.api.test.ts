import request from "supertest";
import {app} from "../../index";


describe('/auth', ()=>{

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it('Should create a new device after login',async ()=>{

        const dataForLogin = {
            loginOrEmail: 'PuY28',
            password: '123qwerty'
        }

        const result = await request(app)
            .post('/login')
            .set('x-forwarded-for', '192:168:1:1')
            .set('user-agent', 'Chrome 12.0.1')
            .send(dataForLogin)
            .expect(200)


        console.log(result,'result')
    })

})