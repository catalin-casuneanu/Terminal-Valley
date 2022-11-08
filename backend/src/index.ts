/* eslint-disable no-console */
import http from 'http';
import process from 'process';
import Overworld from './Battle/Overworld';
import Enemies from './Battle/Enemies';
import utils from './utils';
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/api/game' && req.method === 'GET') {
    // get the data sent along
    // const data = await getReqData(req);
    const randomEnemy = utils.randomFromArray(Array.from(Object.keys(Enemies)));
    const overworld = new Overworld({
      type: 'battle',
      enemyId: randomEnemy
    });
    const result = await overworld.init();
    // set the status code and content-type
    res.writeHead(200, { 'Content-Type': 'application/json' });

    //send the result
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
