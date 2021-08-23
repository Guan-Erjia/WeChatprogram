// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    title: ["商品收藏", "品牌收藏", "店铺收藏", "浏览足迹"],
    title2: ["全部", "当前上映", "即将上线"],
    currentIndex: 0,
    currentIndex2: 0,
  },

  onLoad: function (options) {
    const collect = wx.getStorageSync("collect");
    this.setData({
      collect,
    });
  },
  itemClick(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.item,
    });
  },
  itemClick2(e) {
    this.setData({
      currentIndex2: e.currentTarget.dataset.item,
    });
  },
});
