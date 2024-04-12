const http = require("http");
const handleRequest = (req, res) => {
    console.log(req.url)
    if (req.url === "/character") {
        res.setHeader("Content-Type", "text/json");
        res.writeHead(200);
        res.end("he entrado en la ruta de character")
    }
    else if (req.url === "/holis") {
        res.setHeader("Content-Type", "text/json");
        res.writeHead(200);
        res.end("he entrado en la ruta de holis")
    }
}
const PORT = 3000;
const server = http.createServer(handleRequest);
server.listen(PORT, () => {
    console.log("El servidor se ha iniciado  http://localhost:3000")
})