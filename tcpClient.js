const net = require('net');
const port = 1660;
const host = '127.0.0.1';
const client = new net.Socket();


client.connect(port, host, ()=> {
	console.log('Connected to TCP Server');
	client.write(`Hello from Client ${client.address().address} `);
});
client.on('data', (data) => {
	console.log(`Server Says ${data}`);
});
client.on('close', (data) => {
	console.log(`Connection Close...`);
});