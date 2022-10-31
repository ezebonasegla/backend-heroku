import { serverHttp } from "./app.js";
/* import _yargs from "yargs"; */

/* const yargs = _yargs(process.argv.slice(2));
const args = yargs.default("port", 8080).argv; */

//start Server
/* const port = args.port; */
const port = process.env.PORT || 8080;
serverHttp.listen(port, () => {
  console.log(`The server is listening in port: ${port}`);
});


/* Para probar con FOREVER, descomentar el codigo de abajo y utilizar el siguiente comando: */
/* forever start index.js --mode 'cluster' */

/* import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

const yargs = _yargs(process.argv.slice(2));
const args = yargs.default("port", 8080).argv;
const port = args.port;

const argv = _yargs(process.argv.slice(2)).option('mode', {
  alias: 'm',
  type: 'string',
  description: 'Modo de ejecución del servidor',
  choices: ['fork', 'cluster'],
  default: 'fork'
}).argv;

if (argv.mode === 'cluster') {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      cluster.fork();
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    serverHttp.listen(port);
    console.log(`Worker ${process.pid} started`);
  }
} else {
  serverHttp.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
} */
