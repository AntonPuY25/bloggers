import request from "supertest";
import {app} from "../../index";


describe('/comments',()=>{
    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

})