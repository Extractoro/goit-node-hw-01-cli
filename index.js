console.log(process.argv);
const [, , a, b] = process.argv;

console.log(Number(a) - Number(b));
