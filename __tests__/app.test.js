const db = require('../db');
const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');
const request = require('supertest');

afterAll(() => db.end());

beforeEach(() => {
    return seed(data);
});

describe('GET /api/topics', () => {
    test('should return an array', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray(body)).toBe(true);
        });
    });
    test('should return status 200 and treasure array with correct properties', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            body.forEach((topic) => {
                return expect(topic.hasOwnProperty('slug')).toBe(true);
            });
            body.forEach((topic) => {
                return expect(topic.hasOwnProperty('description')).toBe(true);
            });
        });
    });
});

describe('app.all', () => {
    test('should return status 400 when given wrong endpoint', () => {
      return request(app)
      .get('/api/nonsense')
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Route not found')
      })
  
    });
  });