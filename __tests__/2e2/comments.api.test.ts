import request from "supertest";
import {app} from "../../src";


describe('/comments',()=>{
    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

})