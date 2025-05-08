import * as http from 'http';
import { spawn } from 'child_process';
import * as fs from 'fs';
import { formatFileName, getValueFromField } from './src/utils';

const PATH = '/usr/share/applications/';
const WALL_PATH = '/home/juan/wallpapers/';

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/json'});
    console.log(req.url);
    
    // retorna os wallpapers
    if (req.url === '/wallpapers') {
        const list:{wallpapers: {name:string, path:string}[]} = {wallpapers: []};

        fs.readdirSync(WALL_PATH, {'encoding':'utf-8'}).forEach(file => {
            list.wallpapers.push(
                {
                    name: formatFileName(file),
                    path: WALL_PATH+file
                }
            );
        });
        
        res.write(JSON.stringify(list));
    }
    
    // troca os wallpaper
    if (req.url?.slice(0, 12) === '/wallpapers/' && req.url.length > 12) {
        spawn('feh', ['--bg-scale', `${WALL_PATH}${req.url?.replace('/wallpapers/', '')}.png`]);
    }

    // Busca todos os apps e seus icons
    if (req.url === '/apps/search' /**&& req.method === 'PATCH'**/) {
        const list:{apps: {name:string,exec:string,icon:string}[]} = {apps: []};

        fs.readdirSync(PATH, {'encoding':'utf-8'}).forEach(file => {
            const archive = fs.readFileSync(PATH+file).toString();

            list.apps.push(
                {
                    name: getValueFromField(archive, 'Name='),
                    exec: getValueFromField(archive, 'Exec='),
                    icon: getValueFromField(archive, 'Icon=')
                }
            );
        });

        // list pronta para ser registrada
        fs.writeFileSync('app-list.json', JSON.stringify(list));
        
    }

    // Retorna apps já registrados
    if (req.url === '/apps' && req.method === 'GET') {
        res.write(
            fs.readFileSync('app-list.json')
        );
    }

    res.end();
}).listen(2025, () => {console.log('On air!')});