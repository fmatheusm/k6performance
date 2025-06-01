//Stress test
// ramp up 5 vu em 5s
// carga 5 vu por 5s
//ramp up 50 vu em 2s
//carga 50 vu por 2s
//ramp down 0 vu em 5s

// requisição com fala inferior a 1%

import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 5 },
        { duration: '2s', target: 50 },
        { duration: '2s', target: 50 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01'],
    },
};

const csvData = new SharedArray('ler_dados', function () {
    return papaparse.parse(open('./fixtures/usuarios.csv'), {
        header: true,
    }).data;
});

export default function () {
    const BASE_URL = 'http://localhost:3333';
    const requestBody = JSON.stringify({
        username: csvData[Math.floor(Math.random() * csvData.length)].username,
        password: 'testeQa'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const res = http.post(`${BASE_URL}/api/users/token/login?set_cookie=true`, requestBody, params);

    console.log(res.json());

    const token = JSON.parse(res.body).token;
    console.log('Token extraído:', token);

    check(res, {
        'sucesso login': r => r.status === 200,
        'token gerado': r => r.json('token') !== '',
    });

    sleep(1);
}
