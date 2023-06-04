import request from 'supertest';
import app from '../api/index';

describe('GET /', () => {
    it('should return 200 OK', () => {
        // return hello world
        return request(app).get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', "text/html; charset=utf-8")
        .expect(200, 'Hello World');
    });
});