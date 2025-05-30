//default
import http from 'k6/http';
import { check, sleep } from 'k6';

//remoto
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.14.0/s3.js';

//local
import returnTeste from './realizando-requisicoes-http';

export default function () {
  const res = http.get('');
  sleep(1);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
