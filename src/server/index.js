import cluster from 'cluster';
import { cpus } from 'os';
import { startServer } from './server';

//  global.__DISABLE_SSR__ = false;
//  startServer();

//	heroku fallback
//	const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

const numCPUs = cpus().length;

if (cluster.isMaster) {
	[...new Array(numCPUs)].forEach(() => cluster.fork());

	// cluster manager
	cluster.on('exit', (worker, code, signal) => {
		console.log(`Restarting ${worker.process.pid}. ${code || signal}`);
		cluster.fork();
	});
} else {
	startServer();
}

process.on('uncaughtException', (err) => {
	console.error(err);
	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	console.error(err);
});
