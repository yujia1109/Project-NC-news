const db = require('../db/connection');
const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');
const request = require('supertest');
const { get } = require('../app');

afterAll(() => db.end());

beforeEach(() => {
    return seed(data);
});


describe('GET /api/', () => {
    test('should return status 200 and serve a json object', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({body}) => {
            expect(typeof body).toBe('object');
            expect(body !== null).toBe(true);
            expect(!Array.isArray(body)).toBe(true);
        });
    });
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
            comment_count: '11'
           })
        });
    });
    test('should return status 404 given valid but non-existent id', () => {
        return request(app)
        .get('/api/articles/90')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Article not found')
        });
    });
    test('should return status 400 given invalid id', () => {
        return request(app)
        .get('/api/articles/nonsense')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid input')
        });
    });
});

describe('PATCH /api/articles/:article_id', () => {
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
            votes: 150
           })
        });
    });
    test('should return status 404 given valid but non-existent id', () => {
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
    test('should return status 400 given invalid id', () => {
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
    test('should return status 400 when client send an empty object', () => {
        return request(app)
        .patch('/api/articles/1')
        .send({})
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid input')
        });
    });
    test('should return status 400 when client send request object with wrong key', () => {
        return request(app)
        .patch('/api/articles/1')
        .send({
            banana: 50
         })
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid input')
        });
    });
    test('should return status 400 when client send request object with wrong value data type', () => {
        return request(app)
        .patch('/api/articles/1')
        .send({
            inc_votes: 'apple'
         })
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid input')
        });
    });
});

describe('GET /api/users', () => {
    test('should return an array', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray(body)).toBe(true);
            expect(body).toHaveLength(4)
        });
    });
    test('should return status 200 and user array with correct properties', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body}) => {
            body.forEach((user) => {
                return expect(user.hasOwnProperty('username')).toBe(true);
            });
            body.forEach((user) => {
                return expect(user.hasOwnProperty('name')).toBe(true);
            });
            body.forEach((user) => {
                return expect(user.hasOwnProperty('avatar_url')).toBe(true);
            });
        });
    });
});

describe('GET /api/articles', () => {
    test('should return an array', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray(body)).toBe(true);
            expect(body).toHaveLength(12)
        });
    });
    test('should return status 200 and user array with correct properties', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            body.forEach((article) => {
                return expect(article.hasOwnProperty('article_id') && article.hasOwnProperty('author') && article.hasOwnProperty('title') && article.hasOwnProperty('topic') && article.hasOwnProperty('created_at') && article.hasOwnProperty('votes') && article.hasOwnProperty('comment_count'))
            });
        });
    });
    test('status: 200 default sort by date in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body).toBeSortedBy('created_at', {descending: true})
        });
    });
});

describe('GET /api/articles/:article_id/comments', () => {
    test('should return an array', () => {
        return request(app)
        .get('/api/articles/3/comments')
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray(body)).toBe(true);
            expect(body).toHaveLength(2)
        });
    });
    test('endpoint responds with status of 200 and request object with expected properties', () => {
        return request(app)
        .get('/api/articles/3/comments')
        .expect(200)
        .then(({body}) => {
            body.forEach((comment) => {
                expect(comment.comment_id).toEqual(expect.any(Number));
                expect(comment.votes).toEqual(expect.any(Number));
                expect(comment.author).toEqual(expect.any(String));
                expect(comment.created_at).toEqual(expect.any(String));
                expect(comment.body).toEqual(expect.any(String));
            });
        });
    });
    test('should return status 404 given valid but non-existent id', () => {
        return request(app)
        .get('/api/articles/90/comments')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Comments of this article not found')
        });
    });
    test('should return status 404 return an empty comments', () => {
        return request(app)
        .get('/api/articles/8/comments')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Comments of this article not found')
        });
    });
    test('should return status 400 given invalid id', () => {
        return request(app)
        .get('/api/articles/nonsense/comments')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid input')
        });
    });
});

describe('POST /api/articles/:article_id/comments', () =>{
    test('response with 201 and posted comments', () => {
        return request(app)
        .post('/api/articles/3/comments')
        .send({
            username: 'rogersop',
            body: "It's so funny"
        })
        .expect(201)
        .then(({body: {comment}}) => {
            expect(comment.comment_id).toBe(19);
            expect(comment.body).toBe("It's so funny");
            expect(comment.article_id).toBe(3);
            expect(comment.author).toBe('rogersop');
            expect(comment.votes).toEqual(expect.any(Number));
            expect(comment.created_at).toEqual(expect.any(String));   
        });           
    });
    test('should return status 404 given valid but non-existent id', () => {
        return request(app)
        .post('/api/articles/900/comments')
        .send({
            username: 'rogersop',
            body: "It's so funny"
        })
        .expect(404)
        .then(({body}) => {
                expect(body.msg).toBe('Article not exist')
        });
    });
    test('should return status 400 input invalid id', () => {
        return request(app)
        .post('/api/articles/nonsense/comments')
        .send({
            username: 'rogersop',
            body: "It's so funny"
        })
        .expect(400)
        .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
        });
    });
    test('should return status 400 post empty object', () => {
        return request(app)
        .post('/api/articles/nonsense/comments')
        .send({})
        .expect(400)
        .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
        });
    });
    test('should return status 400 post invalid body', () => {
        return request(app)
        .post('/api/articles/nonsense/comments')
        .send({
            username: 'rogersop',
            body: 888888
        })
        .expect(400)
        .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
        });
    }); 
    test('should return status 400 post invalid username', () => {
        return request(app)
        .post('/api/articles/nonsense/comments')
        .send({
            username: 'banana',
            body: "It's so funny"
        })
        .expect(400)
        .then(({body}) => {
                expect(body.msg).toBe("Invalid input")
        });
    });               
    });

describe('GET /api/articles?sort_by=', () => {
    test('status: 200 accepts sort_by title', () => {
        return request(app)
        .get('/api/articles?sort_by=title')
        .expect(200)
        .then(({ body }) => {
            expect(body).toBeSortedBy('title', {descending: true})
        });
    });
    test('status: 200 accepts sort_by article_id', () => {
        return request(app)
        .get('/api/articles?sort_by=article_id')
        .expect(200)
        .then(({ body }) => {
            expect(body).toBeSortedBy('article_id', {descending: true})
        });
    });
    test('status: 200 accepts sort_by topic', () => {
        return request(app)
        .get('/api/articles?sort_by=topic')
        .expect(200)
        .then(({ body }) => {
            expect(body).toBeSortedBy('topic', {descending: true})
        });
    });
    test('status: 200 accepts sort_by votes', () => {
        return request(app)
        .get('/api/articles?sort_by=votes')
        .expect(200)
        .then(({ body }) => {
            expect(body).toBeSortedBy('votes', {descending: true})
        });
    });
    test('status: 200 default sort by date in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body).toBeSortedBy('created_at', {descending: true})
        });
    });
    test('status: 400 responds with bad request for invalid sort_by query', () => {
        return request(app)
        .get('/api/articles?sort_by=nonsense')
        .expect(400)
        .then(({ body: {msg} }) => {
            expect(msg).toBe('Bad request');
        });
    });
});

describe('GET /api/articles?order=' , () => {
    test('ststus: 200 accepts order data by desc', () => {
        return request(app)
        .get('/api/articles?order=desc')
        .expect(200)
        .then(({ body }) => {
            expect(body[0].article_id).toBe(3)
            expect(body[body.length - 1].article_id).toBe(7)
        });
    });
    test('ststus: 200 accepts order data by asc', () => {
        return request(app)
        .get('/api/articles?order=asc')
        .expect(200)
        .then(({ body }) => {
            expect(body[0].article_id).toBe(7)
            expect(body[body.length - 1].article_id).toBe(3)
        });
    });
    test('ststus: 200 default order is descending', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
            expect(body[0].article_id).toBe(3)
            expect(body[body.length - 1].article_id).toBe(7)
        });
    });
    test('status: 400 responds with bad request for invalid order query', () => {
        return request(app)
        .get('/api/articles?order=nonsense')
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Bad request')
        });
      });
});

describe('GET /api/articles?topic=', () => {
    test('status: 200 accepts topic query which filter the data', () => {
        return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({body}) => {
            expect(body.length).toBe(1);
        })
    });
    test('should return status 404 given valid but topic', () => {
        return request(app)
        .get("/api/articles?topic=banana")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Article not found')
        });
    });
});

describe('DELETE /api/comments/:comment_id', () => {
    test('endpoint responds with status 204', () => {
        return request(app)
        .delete('/api/comments/1')
        .expect(204);
    });
    test('status: 404 for valid but non-existent id', () => {
        return request(app)
        .delete('/api/comments/1234')
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe('Comment not found')
        });
      });
    test('status: 400 responds with bad request for invalid id', () => {
        return request(app)
        .delete('/api/comments/nonsense')
        .expect(400)
        .then(({body}) => {
          expect(body.msg).toBe('Invalid input')
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