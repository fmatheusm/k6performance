//1.Um número fixo de VUs executa quantas requisições forem possíveis
//2.Cada VU executa um número exato de iterações
//3.Número total iterações: VU x Iterações
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      maxDuration: '30s',
    },
  },
};

export default () => {
  http.get('https://test.k6.io/contacts.php');
  sleep(0.5);
};
