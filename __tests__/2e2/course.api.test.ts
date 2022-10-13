import request from 'supertest';
import {app} from "../../src";


describe('/course', () => {

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

    it('should delete a new user', async () => {

        await request(app)
            .delete(`/users/${currentUser.id}`)
            .expect(204)

        await request(app)
            .get(`/users`)
            .expect(404)


    })


})
