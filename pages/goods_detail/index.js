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
});
