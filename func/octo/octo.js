// /.netlify/functions/octo

const fetch = require('node-fetch');

exports.handler = async function (event, context, callback) {
  let url = 'https://www.webdesk.cc/backend/api/v1/tabLink/category/list?type=link';

  let res = await fetch(url);
  let data = await res.json();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data),
  });
};
