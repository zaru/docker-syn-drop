const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// 共通のシャットダウン処理
function shutdown(signal) {
  console.log(`${signal} received: shutting down gracefully`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  
  // 念のため強制終了のタイマー
  setTimeout(() => {
    console.error('Forced shutdown');
    process.exit(1);
  }, 5000).unref();
}

// SIGTERM と SIGINT に対応
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
