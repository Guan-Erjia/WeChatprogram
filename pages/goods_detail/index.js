import { request } from "../../request/index";
Page({
  data: {},
  goodsInfo: {},
  onLoad: function (options) {
    request({
      url: "/goods/detail?goods_id=" + options.goods_id,
    }).then((result) => {
      this.goodsInfo = result.data.message;
      this.setData({
        data: {
          pics: result.data.message.pics,
          goods_price: result.data.message.goods_price,
          goods_name: result.data.message.goods_name,
          goods_introduce: result.data.message.goods_introduce.replace(
            /\.webp/g,
            ".jpg"
          ),
        },
      });
    });
  },
  handlePrevew(e) {
    const urls = this.goodsInfo.pics.map((v) => v.pics_big);
    wx.previewImage({
      urls: urls,
      current: e.currentTarget.dataset.url.pics_big,
    });
  },
  addGoods(e) {
    let cartdata = wx.getStorageSync("cartdata") || [];
    let index = cartdata.findIndex(
      (v) => v.goods_id === this.goodsInfo.goods_id
    );
    if (index === -1) {
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cartdata.push(this.goodsInfo);
    } else {
      cartdata[index].num++;
    }
    wx.setStorageSync("cartdata", cartdata);
    wx -
      wx.showToast({
        title: "加入了一件商品",
        duration: 1500,
        icon: "success",
        mask: true,
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      });
  },
});
