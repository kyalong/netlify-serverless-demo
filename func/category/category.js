// /.netlify/functions/octo

const fetch = require('node-fetch');

exports.handler = async function (event, context, callback) {
  let url = 'https://www.webdesk.cc/backend/api/v1/tabLink/category/list?type=link';
  let res = await fetch(url);
  let data = await res.json();
  let categoryData = data.data;
   if (data.code === 0) {
                       
                        const traverse = (arr) => {
                            return arr.map(item => {
                                if (item.children.length > 0) {
                                    item.children = traverse(item.children, item.categoryId);
                                } else {
                                    delete item.children;
                                }
                                return {
                                    key: item.categoryId,
                                    label: item.categoryName,
                                    title: item.categoryName,
                                    children: item.children,
                                    icon: item.iconUrl,
                                    parentId: item.parentId,
                                    categoryId: item.categoryId,
                                    categoryName: item.categoryName,
                                };

                            });
                        };
                        categoryData = traverse(categoryData);
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(categoryData),
  });
};
