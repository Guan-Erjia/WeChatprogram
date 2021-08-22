import { request } from "../../request/index";
Page({
  getInfo(e) {
    wx.login({
      timeout: 100000,
      success: (result) => {
        const loginconver = {
          encryptedData: e.detail.encryptedData,
          rawData: e.detail.rawData,
          iv: e.detail.iv,
          signature: e.detail.signature,
          code: result.code,
        };
        const res = request({
          url: "/users/wxlogin",
          data: loginconver,
          method: "post",
        });
        res.then((res) => {
          // console.log(res);
          wx.setStorageSync(
            "token",
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
          );
          const token = wx.getStorageSync("token");
          if (token) {
            wx.navigateBack({
              delta: -1,
            });
          }
        });
      },
    });
  },
});
