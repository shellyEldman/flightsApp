const http = require('http');
const fs = require('fs');
const url = require('url');

const contentTypes = new Map();
contentTypes.set('html', 'text/html');
contentTypes.set('js', 'text/javascript');
contentTypes.set('css', 'text/css');
contentTypes.set('json', 'application/json');

http.createServer(function (req, res) {
    const reqUrl = url.parse(req.url, true);
    let ext = reqUrl.pathname.split('.')[1];
    let fileName = reqUrl.pathname.substr(1);
    if(!fileName) {
        fileName = 'file.html';
        ext = 'html';
    }
    const cType = contentTypes.get(ext);

    fs.readFile('public/' + fileName, function(err, data) {
        if(err) {
            if(err.code == 'ENOENT'){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('Resource no found');
            }
            else {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('Server Error');
            }
        } else {
            if((cType === 'application/json') && reqUrl.query.q) {
                data = filterItems(JSON.parse(data), reqUrl.query.q);
            }
           
            res.writeHead(200, {'Content-Type': cType});
            res.write(data);
        }
        res.end();
    });
}).listen(8080, function () {
    console.log('Client is available at http://localhost:8080');
});


function filterItems(data, query) {
    const regex = new RegExp("^" + query, 'i');
    const filteredData = data.filter((item) => {
        return item.to.match(regex);
    });
    return JSON.stringify(filteredData);
};