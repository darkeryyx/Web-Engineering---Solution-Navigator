const http = require('http');
const url = require('url');

const server = http.createServer((anfrage, antwort) => {
    const abfrageObjekt = url.parse(anfrage.url, true).query;

    if (anfrage.method === 'GET' && abfrageObjekt.name) {
        antwort.writeHead(200, {'Content-Type': 'text/plain'});
        antwort.end(`Hallo ${abfrageObjekt.name}!`);
    } else {
        antwort.writeHead(404, {'Content-Type': 'text/plain'});
        antwort.end('Keiner zum gruessen da');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Der Server läuft auf http://localhost:${PORT}`);
});
