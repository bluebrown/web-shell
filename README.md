# Web Shell

This is a basic example of a web shell, using node-pty and xterm.js.

## How to run it?

Run the below command and then visit http://localhost:8080/ in your browser.

```bash
npm install
docker run -d --rm -p 127.0.0.1:8080:8080 -v "$PWD:/usr/share/nginx/html" --name web-shell nginxinc/nginx-unprivileged
node server.mjs
```
