import request from "supertest";
import {app} from "../../index";



describe('/auth',()=>{

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    let currentUser: any = null;

    it('should create a new user with correct Data', async () => {

        const result = await request(app)
            .post('/users')
            .send({
                "login": "puy25",
                "email": "puy25@bk.ru",
                "password": "123123"

            })
            .expect(201)


        expect(result.body.email).toEqual("puy25@bk.ru")
        expect(result.body.login).toEqual("puy25")
        expect(result.body.id).toBeDefined()

        currentUser = result.body;
    })

    it('should auth a created user', async () => {

        await request(app)
            .post('/auth/login')
            .send({
                "login":"puy25",
                "password": "123123"
            })
            .expect(200)

    })

})