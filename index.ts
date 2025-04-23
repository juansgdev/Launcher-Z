import * as http from 'http';
import { spawn } from 'child_process';
import * as fs from 'fs';
import { getValueFromField } from './src/utils';

const PATH = '/usr/share/applications/';

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log(req.url);
    
    spawn('feh', ['--bg-scale', `/home/juan/wallpapers/${req.url?.replace('/', '')}.png`]);

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
        list.apps.forEach(app=>{res.write('Name : ' + app.name+ 'Exec : ' + app.exec+ 'Icon : ' + app.icon)});
        
    }

    // 
    if (req.url === '/apps/search' && req.method === 'PATCH') {
        let list:string = '';

        fs.readdir('/usr/share/applications/', (err, files) => {
            fs.readFile('app-list.json', (err, data) => {
                const dataObject:object = JSON.parse(''+data);
                for (const key in dataObject) {
                    console.log(key);
                    
                }
            });
            
        });
        
    }

    res.end();
}).listen(2025, () => {console.log('On air!')});