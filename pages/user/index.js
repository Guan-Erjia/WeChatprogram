// pages/user/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    const res = wx.getStorageSync("userInfo");
    if (res) {
      const userInfo = JSON.parse(res.rawData);
      this.setData({
        userInfo,
      });
      console.log(this.data.userInfo);
    }
  },
});
