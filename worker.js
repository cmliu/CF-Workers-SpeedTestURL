export default {
  async fetch(request) {
    // 创建一个新的 URL 对象
    let url = new URL(request.url);
    let path = url.pathname.substring(1);
    let isSecure = url.protocol.startsWith("https");
    let bytes;
    // 判断路径是否为空
    if (!path) {
      // 路径为空，将 bytes 赋值为 200MB
      bytes = 200000000;
    } else if (path === "locations") {
      let targetUrl = `http${isSecure ? 's' : ''}://speed.cloudflare.com/locations`;
      let cfRequest = new Request(targetUrl, request);
      let response = await fetch(cfRequest);
      return response;
    } else {
      // 其他路径，进行正常的处理
      const regex = /^(\d+)([a-z]?)$/i;
      const match = path.match(regex);
      if (!match) {
        // 路径格式不正确，返回错误
        return new Response("路径格式不正确", {
          status: 400,
        });
      }

      const bytesStr = match[1];
      const unit = match[2].toLowerCase();

      // 转换单位
      bytes = parseInt(bytesStr, 10);
      if (unit === "k") {
        bytes *= 1000;
      } else if (unit === "m") {
        bytes *= 1000000;
      } else if (unit === "g") {
        bytes *= 1000000000;
      }
    }

    let targetUrl = `http${isSecure ? 's' : ''}://speed.cloudflare.com/__down?bytes=${bytes}`;
    let cfRequest = new Request(targetUrl, request);
    let response = await fetch(cfRequest);

    // 将测试结果反馈给用户
    return response;
  }
};
