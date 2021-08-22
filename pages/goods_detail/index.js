import { request } from "../../request/index";
Page({
  data: {
    data: [],
    isCollect: false,
  },

  onLoad: function (options) {
    request({
      url: "/goods/detail?goods_id=" + options.goods_id,
    }).then((result) => {
      const collect = wx.getStorageSync("collect") || [];
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
        //收藏赋值
        isCollect: collect.indexOf(result.data.message.goods_id) != -1,
      });
    });
  },
  collectGood() {
    const collect = wx.getStorageSync("collect") || [];
    if (collect.indexOf(this.data.goodsInfo.goods_id) === -1) {
      collect.push(this.data.goodsInfo.goods_id);
      wx.setStorageSync("collect", collect);
      this.setData({
        isCollect: true,
      });
    } else {
      let a = collect.indexOf(this.data.goodsInfo.goods_id);
      collect.splice(a, 1);
      wx.setStorageSync("collect", collect);
      this.setData({
        isCollect: false,
      });
    }
    console.log(collect);
  },
  handlePrevew(e) {
    const urls = this.data.goodsInfo.pics.map((v) => v.pics_big);
    wx.previewImage({
      urls: urls,
      current: e.currentTarget.dataset.url.pics_big,
    });
  },
  addGoods(e) {
    let cartdata = wx.getStorageSync("cartdata") || [];
    let index = cartdata.findIndex(
      (v) => v.goods_id === this.data.goodsInfo.goods_id
    );
    if (index === -1) {
      this.data.goodsInfo.num = 1;
      this.data.goodsInfo.checked = true;
      cartdata.push(this.data.goodsInfo);
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
  onShow() {},
});
