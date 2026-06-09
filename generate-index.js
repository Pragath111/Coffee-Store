import fs from 'fs';
import server from './dist/server/server.js';

async function generate() {
  const req = new Request('http://localhost/');
  const res = await server.fetch(req, {}, {});
  const html = await res.text();
  fs.writeFileSync('./dist/client/index.html', html);
  console.log('Successfully generated index.html at dist/client/index.html');
}

generate().catch(console.error);
