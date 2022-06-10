const http = require('http');
 const port  = 3000

 const server = http.createServer((req, res) => {
     res.end("Pagina inicial do Server NodeJs ");
 
 });

server.listen(port, () => {
    console.log(`servidor iniciado na porta ${port}: http://localhost:${port}`);
})
