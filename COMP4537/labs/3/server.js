const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const messages = require('./lang/en/en');
const { getDate } = require('./js/modules/utils');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const basePath = '/COMP4537/labs/3';
    const filePath = path.join(__dirname, 'file.txt');

    if (pathname === `${basePath}/getDate/`) {
        const name = query.name;
        const message = getDate(name);;
        const html = `
            <!DOCTYPE html>
            <html>
            <body>
                <p style="color: blue; font-size: 20px; font-family: Arial;">
                    ${message}
                </p>
            </body>
            </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(html);
    }

    if (pathname === `${basePath}/writeFile/`) {
        const text = query.text;

        if (!text) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('400 - Missing text query parameter');
        }

        fs.appendFile(filePath, text + '\n', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('500 - Error writing to file');
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Text "${text}" appended to file.txt`);
        });

        return;
    }

    if (pathname.startsWith(`${basePath}/readFile/`)) {
        const requestedFile = pathname.split('/').pop();

        if (requestedFile !== 'file.txt') {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end(`404 - File ${requestedFile} not found`);
        }

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end(`404 - File ${requestedFile} not found`);
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
