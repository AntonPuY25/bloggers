import request from "supertest";
import {app} from "../../index";


describe('/blogs', () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    let currentBlog: any = null;

    it('Should create a new blogger', async () => {

        const result = await request(app)
            .post('/blogs')
            .send({
                "name": "Bob",
                "websiteUrl": "https://websiteUrl.com"
            })


        currentBlog = result.body

        expect(result.status).toBe(201)
        expect(result.body.name).toEqual("Bob")
        expect(result.body.websiteUrl).toEqual("https://websiteUrl.com")

    })

    it('should get created blogs', async () => {
        const result = await request(app)
            .get('/blogs')
            .expect(200)

        expect(result.body.items).toHaveLength(1)

    })

    it('Should get current blog', async () => {
        const result = await request(app)
            .get(`/blogs/${currentBlog.id}`)
            .expect(200)

        expect(result.body.name).toEqual(currentBlog.name)
        expect(result.body.websiteUrl).toEqual(currentBlog.websiteUrl)
    })

    it('Should update current blog', async () => {
        await request(app)
            .put(`/blogs/${currentBlog.id}`)
            .send({
                "name": "Anton 3.0",
                "websiteUrl": "https://youtoube2.0.com"
            })
            .expect(204)

        const result = await request(app)
            .get(`/blogs/${currentBlog.id}`)
            .expect(200)

        expect(result.body.name).toEqual('Anton 3.0')
        expect(result.body.websiteUrl).toEqual('https://websiteUrl.0.com')
    })


    it('Should create post for current blog', async ()=>{

        const result = await request(app)
            .post(`/blogs/${currentBlog.id}/posts`)
            .send({
                "title": "This new Post 123",
                "shortDescription": "AAAAAAAAAAAAAAAAAAAA",
                "content": "No content"
            })
            .expect(201)

            expect(result.body.title).toEqual('This new Post 123')
            expect(result.body.shortDescription).toEqual('AAAAAAAAAAAAAAAAAAAA')
            expect(result.body.content).toEqual('No content')
            expect(result.body.blogId).toEqual(currentBlog.id)
    })

    it('Should get posts for current blog', async ()=>{
        const result = await request(app)
            .get(`/blogs/${currentBlog.id}/posts`)
            .expect(200)

        expect(result.body.items[0].title).toEqual('This new Post 123')
        expect(result.body.items[0].blogId).toEqual(currentBlog.id)

    })


    it('Should delete current blog', async ()=>{
        await request(app)
            .delete(`/blogs/${currentBlog.id}`)
            .expect(204)

        const result = await request(app)
            .get('/blogs')
            .expect(200)

        expect(result.body.items).toHaveLength(0)
    })
})