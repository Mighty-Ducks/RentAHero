const supertest = require('supertest');
const { app } = require('../server/api/index.js');

const request = supertest(app);

describe('Superhero Tests', () => {
  describe('Fetch superheroes', () => {
    it('Returns status 200', async () => {
      const res = await request.get('/api/superheroes');
      expect(res.statusCode).toBe(200);
    });
  });
  describe('Create a new superhero', () => {
    it('Returns status 200, and the posted objects', (done) => {
      return request
        .post('/api/superheroes')
        .send({
          name: 'Batman',
          description: 'Rich kid with issues',
          imgURL:
            'https://breakinggeek.files.wordpress.com/2013/10/dak-knight.jpg?',
        })
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe('Batman');
          expect(res.body.description).toBe('Rich kid with issues');
          expect(res.body.imgURL).toBe(
            'https://breakinggeek.files.wordpress.com/2013/10/dak-knight.jpg?'
          );
          done();
        });
    });
  });
});
