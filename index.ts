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
        fs.readdir('/usr/share/applications/', (err, files) => {
            let list:{apps: [{name:string,exec:string,icon:string}]} = {
                apps: [
                    {
                        name: '',
                        exec: '',
                        icon: ''
                    }
                ]
            };

            files.forEach(file => {
                fs.readFile(PATH+file, (err, data) => {
                    const text = ''+data;

                    // indice do 
                    const searched = text.match(/Icon/);
                    //searched !== null ? console.log(searched.index) : false;
                    
                    list.apps.push({
                        name : getValueFromField(text, 'Name='),
                        exec : getValueFromField(text, 'Exec='),
                        icon : getValueFromField(text, 'Icon=')
                    });

                    files[files.length-1] === file ? list.apps.forEach(e => {   
                        console.log(e);
                        
                    }) : false;
                });

                
            });
        });
        
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