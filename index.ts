import * as http from 'http';
import { spawn } from 'child_process';

console.log('On air!');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(req.url);
    
    spawn('feh', ['--bg-scale', `/home/juan/wallpapers/${req.url?.replace('/', '')}.png`]);

    res.end();
}).listen(2025);