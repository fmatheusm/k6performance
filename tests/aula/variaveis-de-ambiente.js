import http from 'k6/http';
import { check } from 'k6';

export const options = {
  //k6 run --duration 5m --vus 10
  vus: 1,
  duration: '3s',
};

export default function () {
  const BASE_URL = __ENV.BASE_URL; // k6 run -env URL=https://quickpizza.grafana.com
  const res = http.get(BASE_URL);
  check(res, {
    'status code é 200': (r) => r.status === 200,
  });
}
