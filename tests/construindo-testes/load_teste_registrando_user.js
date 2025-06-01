import http from 'k6/http';
import { check, sleep } from 'k6';
import uuid from './libs/uuid.js';

//carga 10 vu por 10 segundo
//requisições com sucesso 95%
//requisições com falha < 1%
//duração da requisição 95% < 500ms

export const options = {
  stages: [{ duration: '10s', target: 10 }],
  thresholds: {
    checks: ['rate > 0.95'],
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(95) < 500'],
  },
};

// é possível passar um headers padrão basta colocar a propriedade headers{'Content-Type': 'application/json'}

// ou podemos configurar  desa forma

// export const opt = {
//   vus: 10,
//   duration: '10s',
//   thresholds: {
//     checks: ['rate < 0.95'],
//     http_req_failed: ['rate < 0.01'],
//     http_req_duration: ['p(95) < 500'],
//   },
// };

export default function () {
  const BASE_URL = 'http://localhost:3333';

  const user = `${uuid.v4().substring(24)}.@qa.k6.com`;
  const pass = 'testeQa';
  console.log(user + pass);

  //método /user/register/
  const payload = JSON.stringify({
    username: user,
    password: pass,
  });

  const headers = {
    headers: { 'Content-Type': 'application/json' },
  };

  //   const res = http.post(`${BASE_URL}/api/users`, payload, { headers: headers });

  const res = http.post(`${BASE_URL}/api/users`, payload, headers);

  check(res, {
    'sucesso ao registrar': (r) => r.status === 201,
  });
  sleep(1);
}
