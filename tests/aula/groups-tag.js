import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  vus: 4,
  duration: '5s',
  thresholds: {
    'http_req_duration{group:::requisicao por id}': ['p(95) < 500'],
    'http_req_duration{tipo:busca-todos}': ['p(95) < 500'],
  },
};

export default function () {
  group('requisicao todos os crocodilos', function () {
    const res1 = http.get('https://test-api.k6.io/public/crocodiles/', {
      tags: {
        tipo: 'busca-todos',
      },
    });
    check(res1, {
      'status code 200 get all': (r) => r.status === 200,
    });
  });

  group('requisicao por id', function () {
    const res2 = http.get('https://test-api.k6.io/public/crocodiles/1/');
    check(res2, {
      'status code 200 get id': (r) => r.status === 200,
    });
  });
}
