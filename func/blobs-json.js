import { getStore } from "@netlify/blobs";

exports.handler = async (event, context) => {
  const { httpMethod, path } = event;
  const store = getStore("json-store");
  
  // 提取路径参数
  const pathParts = path.split('/');
  const fileName = pathParts[pathParts.length - 1];
  
  try {
    switch (httpMethod) {
      case 'GET':
        // 读取 JSON 文件
        const data = await store.get(fileName);
        if (!data) {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: 'File not found' })
          };
        }
        return {
          statusCode: 200,
          body: data
        };
        
      case 'POST':
        // 创建或更新 JSON 文件
        const { key, value } = JSON.parse(event.body);
        await store.setJSON(key, JSON.stringify(value));
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'File saved successfully' })
        };
        
      case 'DELETE':
        // 删除 JSON 文件
        await store.delete(fileName);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'File deleted successfully' })
        };
        
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ message: 'Method not allowed' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};