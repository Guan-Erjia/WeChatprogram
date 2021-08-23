// pages/feedback/index.js
Page({
  data: {
    title: ["体验问题", "商品、商家投诉"],
    currentIndex: 0,
    currentImages: [],
  },
  itemClick(e) {
    this.setData({
      currentIndex: e.target.dataset.item,
    });
  },
  chooseImage() {
    wx.chooseImage({
      count: 0,
      success: (res) => {
        let currentImages = this.data.currentImages;
        res.tempFilePaths.forEach((v) => {
          currentImages.push(v);
        });
        this.setData({
          currentImages,
        });
      },
    });
  },
  cancelTap(e) {
    const a = e.currentTarget.dataset.item;
    console.log(a);
    const currentImages = this.data.currentImages;
    currentImages.splice(a, 1);
    this.setData({
      currentImages,
    });
  },
  submitData() {
    const a = this.data.currentImages;
    console.log(a);
    wx.uploadFile({
      filePath: "filePath",
      name: "name",
      url: "url",
    });
  },

  onLoad: function (options) {},
});
