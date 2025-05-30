// Carga constante
export const options1 = {
  vus: 100,
  duration: '20m',
};

// Carga variavel
export const options2 = {
  stages: [
    { duration: '5m', target: 100 }, // faze de arrancada ramp up
    { duration: '10m', target: 100 }, // faze de carga
    { duration: '5m', target: 0 }, // faze de desaceleração ramp down
  ],
};
