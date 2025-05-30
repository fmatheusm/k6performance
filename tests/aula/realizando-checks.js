import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  duration: '3s',
};

export default function () {
  const res = http.get('https://quickpizza.grafana.com');
  check(res, {
    'status code é 200': (r) => r.status === 200,
  });
}
