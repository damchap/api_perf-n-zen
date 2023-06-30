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

describe('GET /invalid', () => {
    it('should return 404 Not Found', () => {
        // return not found
        return request(app).get('/invalid')
        .set('Accept', 'application/json')
        .expect('Content-Type', "text/html; charset=utf-8")
        .expect(404, 'Not Found');
    });
});

describe('POST /api/login', () => {
    it('should return 200 OK and a token', () => {
        // return access and refresh tokens
        return request(app).post('/api/login')
        .send({ username: 'admin', password: 'admin' })
        .set('Accept', 'application/json')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveProperty('accessToken');
            expect(response.body).toHaveProperty('refreshToken');
        });
    });
});

// test pour la route /api/v1/questionnaire/:id avec un id 1 pour le questionnaire et un id 1 pour l'utilisateur
describe('GET /api/v1/questionnaire/:id', () => {
    it('should return 200 OK and a questionnaire', () => {
        // return questionnaire
        return request(app).post('/api/v1/questionnaire/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', "application/json; charset=utf-8")
        .send({ ID_person: 1, ID_questionnaire: 1 })
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveProperty('questionnaire');
        });
    });
});
