const net = require('net');
const port = 1660;
const host = '127.0.0.1';
const server  = net.createServer();

server.listen(port, host, () => {
	console.log(`TCP Server is running on port ${port}`);
});

let sockets = [];
server.on('connection', (sock) => {
	console.log(`Connected: ${sock.remoteAddress} : ${sock.remotePort}`);
	sockets.push(sock);
	// On Data
	sock.on('data', (data) => {
		console.log(`Data ${sock.remoteAddress} : ${data}`);
		sockets.forEach((sock, index, array) => {
			sock.write(`${sock.remoteAddress} : ${sock.remotePort} said ${data} \n`);
		});
	});
	// On Close
	sock.on('close', (data) => {
		let index = sockets.findIndex((o) => {
			return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort
		});
		if (index != -1) {
			sockets.splice(index, 1)
			console.log(`Closed ${sock.remoteAddress} : ${sock.remotePort}`);
		}
	});
});