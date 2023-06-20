const format3P = (number: Number) => {
    return Number(Math.round(parseFloat(number + 'e3')) + 'e-3')
        .toString()
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export { format3P };
export { default as config } from './config';
export { default as history } from './history';
