import { request } from "../../request/index";
Page({
  data: {
    title: ["综合", "销量", "价格"],
    goods: [],
    currentIndex: 0,
    total: 0,
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  itemClick(e) {
    this.setData({
      currentIndex: e.target.dataset.item,
      goods: [],
    });
    this.QueryParams.query = e.target.dataset.item;
    this.getData(this.QueryParams);
    wx.showLoading({
      title: "加载中",
    });
  },
  getData(params) {
    request({
      url: "/goods/search",
      data: { ...params },
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
    }).then((result) => {
      this.setData({
        goods: this.data.goods.concat(result.data.message.goods),
        total: result.data.message.total,
      });
      wx.hideLoading();
    });
  },
  onLoad: function (options) {
    if (options.cid) {
      this.QueryParams.cid = options.cid;
    } else {
      this.QueryParams.query = options.query;
    }
    this.getData(this.QueryParams);
    wx.showLoading({
      title: "加载中",
    });
  },
  onReachBottom() {
    if (this.data.goods.length < this.data.total) {
      console.log("发起请求");
      this.QueryParams.pagenum += 1;
      this.getData(this.QueryParams);
      wx.showLoading({
        title: "加载中",
      });
    } else {
      wx.showToast({
        title: "没有更多商品了",
      });
    }
  },
  onPullDownRefresh() {
    this.setData({
      goods: [],
      total: 0,
    });
    this.QueryParams.pagenum = 1;
    this.getData(this.QueryParams);
  },
});
