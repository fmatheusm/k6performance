//1.Número fixo de interações iniciadas pelo K6
//2.Novas iterações iniciadas enquanto houver VUs disponíveis
//3.Novas iterações seguindo sempre a taxa configurada.
import http from 'k6/http';

export const options = {
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      rate: 30,
      timeUnit: '1s',
      preAllocatedVUs: 50,
    },
  },
};

export default () => {
  http.get('https://test.k6.io/contacts.php');
};
/* Outros executores
ramping-vus
ramping-arrival-rate
externally-controlled
*/
