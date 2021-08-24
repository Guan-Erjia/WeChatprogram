// pages/user/index.js
Page({
  data: {
    userInfo: {},
    collectCount: 0,
  },
  service() {
    console.log("aaa");
    wx.makePhoneCall({
      phoneNumber: "1340000", //仅为示例，并非真实的电话号码
      fail: (res) => {
        console.log(res);
      },
    });
  },

  onLoad: function (options) {
    const count = wx.getStorageSync("collect");
    this.setData({
      collectCount: count.length,
    });
  },

  onShow: function () {
    const res = wx.getStorageSync("userInfo");
    if (res) {
      const userInfo = JSON.parse(res.rawData);
      this.setData({
        userInfo,
      });
    }
  },
});
