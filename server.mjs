import pty from 'node-pty';
import { createWebSocketStream, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('new connection');

    const duplex = createWebSocketStream(ws, { encoding: 'utf8' });

    const proc = pty.spawn('docker', ['run', "--rm", "-ti", "ubuntu", "bash"], { name: 'xterm-color' });

    const onData = proc.onData((data) => duplex.write(data));

    const exit = proc.onExit(() => {
        console.log("process exited");
        onData.dispose();
        exit.dispose();
    });

    duplex.on('data', (data) => proc.write(data.toString()));

    ws.on('close', function () {
        console.log('stream closed');
        proc.kill();
        duplex.destroy();
    });
});
