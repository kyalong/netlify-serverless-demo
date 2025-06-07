// /.netlify/functions/octo

const fetch = require('node-fetch');
exports.handler = async function (event, context, callback) {
    const params = event.queryStringParameters;
 let url = `https://www.webdesk.cc/backend/api/v1/tabLink/link/item/${params.categoryId}?page=${params.page}&pageSize=${params.pageSize}`;
  let res = await fetch(url);
  let data = await res.json();

   if (data.code === 0) {
                      
                        callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(data.data),
  });
  }

};
