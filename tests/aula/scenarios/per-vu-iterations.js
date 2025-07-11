// 1. Cada VU executa um número exato de iterações
// Número total iterações: VU x Iterações
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '30s',
    },
  },
};

export default () => {
  http.get('https://test.k6.io/contacts.php');
  sleep(0.5);
};
