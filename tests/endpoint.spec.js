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
    it('Returns status 200, and the posted object', (done) => {
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

describe('Acts Tests', () => {
  describe('Fetch acts', () => {
    it('Returns status 200', async () => {
      const res = await request.get('/api/acts');
      expect(res.statusCode).toBe(200);
    });
  });
  describe('Create a new act', () => {
    it('Returns status 200, and the posted object', (done) => {
      return request
        .post('/api/acts')
        .send({
          name: 'Blast from the Past',
          description:
            'Take a trip back in time to the prehistoric era with Flash!',
          price: 5000,
        })
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe('Blast from the Past');
          expect(res.body.description).toBe(
            'Take a trip back in time to the prehistoric era with Flash!'
          );
          expect(res.body.price).toEqual(5000);
          done();
        });
    });
  });
});

describe('Categories Tests', () => {
  describe('Fetch categories', () => {
    it('Returns status 200', async () => {
      const res = await request.get('/api/acts');
      expect(res.status).toBe(200);
    });
  });
  describe('Create a new category', () => {
    it('Returns status 200, and the posted object', (done) => {
      return request
        .post('/api/categories')
        .send({
          name: 'Aliens',
        })
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe('Aliens');
          done();
        });
    });
  });
});
