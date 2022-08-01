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
            expect(body).toHaveLength(3)
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

describe('GET /api/articles/:article_id', () => {
    test('endpoint responds with status of 200 and request object with expected properties', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({body}) => {
           expect(body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
           })
        });
    });
    test('input invalid id', () => {
        return request(app)
        .get('/api/articles/90')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Article not found')
        });
    });
    test('should return status 400 when given invalid id', () => {
        return request(app)
        .get('/api/articles/nonsense')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid input')
        });
    });
});

describe.only('PATCH /api/articles/:article_id', () => {
    test('endpoint responds with status of 200 and request object with expected properties', () => {
        return request(app)
        .patch('/api/articles/1')
        .send({
            inc_votes: 50
         })
        .expect(200)
        .then(({body}) => {
           expect(body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 150,
           })
        });
    });
    test('input invalid id', () => {
        return request(app)
        .patch('/api/articles/900')
        .send({
            inc_votes: 50
         })
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Article not found')
        });
    });
    test('should return status 400 when given invalid id', () => {
        return request(app)
        .patch('/api/articles/nonsense')
        .send({
            inc_votes: 50
         })
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid input')
        });
    });
})

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