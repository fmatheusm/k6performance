/*
1.Realizar consulta a API de listagem de busca por id
2.É esperado um RPS de 200 req/s para a api de listagem durante 30 segundo
3.Para a busca por id, o sistema deve atender 50 usuários onde cada usuário realiza até 20 solicitações em até 1m
    3.1.Usuário par deve realizar busca ao id 4
    3.2.usuário ímpar deve realizar busca ao id 5
4.Ambos os testes devem ser executados simultaneamente. 
Obs: Nesses testes serão utilizados scenarios
*/
// http://localhost:3333/api/ratings

import http from 'k6/http';

export const options = {
    scenarios: {
        listar: {
            executor: 'constant-arrival-rate',
            exec: 'listar',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preAllocatedVUs: 150,
            gracefulStop: '10s',
            tags: { teste_type: 'listagem_de_pizzas' }
        },
        buscar: {
            executor: 'per-vu-iterations',
            exec: 'buscar',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            gracefulStop: '10s',
            tags: { teste_type: 'busca_de_pizza_id' }
        }
    },
};

export function setup() {
    const requestBody = JSON.stringify({
        username: 'default',
        password: "12345678",
    });

    const token = http.post(`${__ENV.URL}/api/users/token/login`, requestBody);
    return {
        headers: {
            'Authorization': `Bearer ${token.json('token')}`,
            'Content-Type': 'application/json'
        }
    }

}

export function listar(headers) {
    http.get(__ENV.URL + '/api/ratings', headers);
}

export function buscar(headers) {
    if (__VU % 2 === 0) {
        http.get(__ENV.URL + '/api/ratings/2', headers);
    }
    else {
        http.get(__ENV.URL + '/api/ratings/1', headers);
    }
}