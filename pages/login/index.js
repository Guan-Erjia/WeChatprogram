// pages/login/index.js
Page({
  data: {},
  getUserProfile() {
    wx.getUserProfile({
      desc: "用于完善会员资料",
      success: (res) => {
        wx.setStorageSync("userInfo", res);
        wx.showToast({
          title: "登录成功",
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          });
        }, 2000);
      },
    });
  },

  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
});
