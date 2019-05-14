process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const config = require('../config');
const PORT = config.PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

require('../../server');



// before(() => {
//     // connect to db
//     const { db, pgp } = require('../db.config');
//     const { schema, seed } = require('../data.js');
//     // drop tables and create them again
//     db.tx(t => {
//         return t.batch([
//             // drop all tables;
//             t.none('DROP TABLE IF EXISTS users'),
//             t.none('DROP TABLE IF EXISTS Routines'),
//             t.none('DROP TABLE IF EXISTS UserAsanas'),
//             t.none('DROP TABLE IF EXISTS asanas'),
            
//             // create all tables;
//             t.none(schema),
           
//             // insert records into tables;
//             t.none(seed)
          
//         ]);
//     })
//     .then(() => {
//         console.log('*** DATABASE TESTS RESEEDED ***');
//     })
//     .catch(error => {
//         console.log('FAILED:', error);
//     })
//     .finally(pgp.end);
// });

describe('GET /api/', () => {
    it('returns the status ok', (done) => {
        request(ROOT)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('OK');
                done();
            });
    });
});

describe('GET /api/asanas', () => {
    it('returns all asanas', (done) => {
        request(ROOT)
            .get('/asanas')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

describe('GET /api/types', () => {
it('returns all asanas types', (done) => {
    request(ROOT)
        .get('/types')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        });
});
});

describe('GET /api/asanas/:id', () => {
    it('returns all asanas by id', (done) => {
        request(ROOT)
            .get('/asanas/3')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data.id).to.be.a('number');
                done();
            });
    });
});

describe('GET /api/routines', () => {
    it('returns all routines', (done) => {
        request(ROOT)
            .get('/routines')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

describe('GET /api/:user/routines', () => {
    it('returns all routines by user', (done) => {
        request(ROOT)
            .get('/1/routines')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data[0]).to.be.an('object');
                expect(res.body.data[0].userid).to.be.a('number');
                done();
            });
    });
});





