const http = require('http');
const fs = require('fs')
const data = fs.readFileSync('main.ejs', 'utf-8')
const ejs = require('ejs')
const qs = require('querystring')

let namesToEJS;
let technosToEJS;


// let readingJSON = function () {
// fs.readFile('./data.json', (err, data) => {
//     if (err) throw err;
//     list = JSON.parse(data);
//     namesToEJS = list.names
//     technosToEJS = list.technologies
//     console.log(list)
//     console.log(namesToEJS)
//     console.log('--------')
//     console.log(technosToEJS)
//     console.log('--------')
// });

// }

// let writingJSON = function () {
//     fs.writeFile('data.json',JSON.stringify(list))

// }


http.createServer((req, res) => {
    let list = {
        names: [],
        technologies: []
    }
    fs.writeFile('data.json',JSON.stringify(list))

    if(req.method === 'GET') {
    res.writeHead(200)
    fs.readFile('./data.json', (err, data) => {
        if (err) throw err;
        list = JSON.parse(data);
        namesToEJS = list.names
        technosToEJS = list.technologies
        
    });
    res.end(ejs.render(data , {namesToEJS: namesToEJS, technosToEJS: technosToEJS}))
    }
    else {
        let stock = ''
            
        req.on('data', function(value){
            stock+= value;
        })
        res.setHeader("Content-Type", "text/html")
        req.on('end', () => {
            fs.readFile('./data.json', (err, data) => {
                if (err) throw err;
                list = JSON.parse(data);
            })
            let parsedValue = qs.decode(stock)
           if (parsedValue.name) {list.names.push(parsedValue.name)}
           if(parsedValue.techno) {list.technologies.push(parsedValue.techno)}
           fs.writeFile('data.json',JSON.stringify(list))
           
        res.writeHead(200)
        res.end(ejs.render(data , {namesToEJS: namesToEJS, technosToEJS: technosToEJS}))
        })
    }
}).listen(8080)

console.log('Listening on port 8080');
