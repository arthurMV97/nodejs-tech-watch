
const http = require('http');
const fs = require('fs')
const ejs = require('ejs')
const qs = require('querystring')
let namesTab = []
let technos = [];
let list;
let namesToEJS;
fs.readFile('./data.json', (err, data) => {
    if (err) throw err;
    list = JSON.parse(data);
    namesToEJS = list.names
    console.log(list)
    console.log(namesToEJS)
    console.log('--------')
});






http.createServer((requete, reponse) => {
    
    fs.promises.readFile(__dirname + "/main.ejs", 'utf-8')
        .then(contents => {
            let stock = ''
            
            requete.on('data', function(value){
                stock+= value;
                
            })
            reponse.setHeader("Content-Type", "text/html")
            requete.on('end', () => {
                let parsedValue = qs.decode(stock)
                // console.log(parsedValue)
                namesTab.push(parsedValue.name)
                technos.push(parsedValue.techno)
                console.log(namesTab)
                console.log(technos)
               
            reponse.writeHead(200)
            reponse.write(ejs.render(contents , {namesToEJS: namesToEJS}))
            reponse.end()
            // reponse.end(contents)
            
            
            
            })
        })
        .catch(err => {
            reponse.writeHead(500);
            reponse.end();
            return;
        });
    
    

    
}).listen(8000)


console.log('Read on port 8000');
