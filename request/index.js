export const request = (params) => {
  let header = { ...params.header };
  if (params.url.includes("/my/")) {
  }
  return new Promise((resolve, reject) => {
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    wx.request({
      ...params,
      header,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
