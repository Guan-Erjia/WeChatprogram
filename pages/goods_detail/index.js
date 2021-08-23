import { request } from "../../request/index";
Page({
  data: {
    dataInfo: [],
    isCollect: false,
  },

  onLoad: function (options) {
    request({
      url: "/goods/detail?goods_id=" + options.goods_id,
    }).then((result) => {
      const collect = wx.getStorageSync("collect") || [];
      console.log(result.data.message.goods_id);
      this.setData({
        dataInfo: {
          pics: result.data.message.pics,
          goods_price: result.data.message.goods_price,
          goods_name: result.data.message.goods_name,
          goods_id: result.data.message.goods_id,
          goods_big_logo: result.data.message.goods_big_logo,
          goods_introduce: result.data.message.goods_introduce.replace(
            /\.webp/g,
            ".jpg"
          ),
        },
        //收藏赋值
        isCollect: collect.some(
          (item) => item.goods_id === result.data.message.goods_id
        ),
      });
    });
  },
  collectGood() {
    const collect = wx.getStorageSync("collect") || [];
    if (
      !collect.some((item) => item.goods_id === this.data.dataInfo.goods_id)
    ) {
      collect.push(this.data.dataInfo);
      wx.setStorageSync("collect", collect);
      this.setData({
        isCollect: true,
      });
    } else {
      let a = collect.findIndex(
        (v) => v.goods_id === this.data.dataInfo.goods_id
      );
      collect.splice(a, 1);
      wx.setStorageSync("collect", collect);
      this.setData({
        isCollect: false,
      });
    }
  },
  handlePrevew(e) {
    const urls = this.data.dataInfo.pics.map((v) => v.pics_big);
    wx.previewImage({
      urls: urls,
      current: e.currentTarget.dataset.url.pics_big,
    });
  },
  addGoods(e) {
    let cartdata = wx.getStorageSync("cartdata") || [];
    let index = cartdata.findIndex(
      (v) => v.goods_id === this.data.dataInfo.goods_id
    );
    if (index === -1) {
      this.data.dataInfo.num = 1;
      this.data.dataInfo.checked = true;
      cartdata.push(this.data.dataInfo);
    } else {
      cartdata[index].num++;
    }
    wx.setStorageSync("cartdata", cartdata);
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
