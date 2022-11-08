import http from 'http';

function getReqData(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      // listen to data sent by client
      req.on('data', (chunk) => {
        // append the string version to the body
        body += chunk.toString();
      });
      // listen till the end
      req.on('end', () => {
        // send back the data
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
function randomFromArray(array: unknown[]) {
  return array[Math.floor(Math.random() * array.length)];
}
function randomFromMinMax(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function random() {
  return Math.random() * 100;
}
export default {
  getReqData,
  randomFromArray,
  randomFromMinMax,
  random
};
