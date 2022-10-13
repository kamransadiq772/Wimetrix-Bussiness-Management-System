const request = require('supertest')
const {app} = require('../index')


describe('User API', () => {
  it('Should return statusCode of 200 with user data Object', async() => {
     const res = await request(app).post('http://localhost:4000/').send({email:'QA', password:'12345'})
      expect(res.statusCode).toBe(200)
      return
  });  
})