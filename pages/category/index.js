import { request } from "../../request/index";
import { regeneratorRuntime } from "../../lib/runtime";
Page({
  data: {
    datalist: {},
    dataitem: {},
    infodata: {},
    currentIndex: 0,
    scrollTop: -1,
  },
  click(e) {
    this.setData({
      currentIndex: e.target.dataset.index,
      dataitem: this.data.infodata[e.target.dataset.index].children,
      scrollTop: 0,
    });
  },
  getData() {
    request({
      url: "/categories",
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
    }).then((result) => {
      this.setData({
        infodata: result.data.message,
        dataitem: result.data.message[0].children,
        datalist: result.data.message.map((item) => item.cat_name),
      });
      wx.setStorage({
        key: "cate",
        data: { data: result, time: Date.now() },
      });
    });
  },
  onLoad: function (options) {
    try {
      var value = wx.getStorageSync("cate");
      if (value) {
        if (Date.now() - value.time < 10000) {
          this.setData({
            infodata: value.data.data.message,
            dataitem: value.data.data.message[0].children,
            datalist: value.data.data.message.map((item) => item.cat_name),
          });
          console.log("使用旧数据");
        } else {
          this.getData();
          console.log("请求数据");
        }
      } else {
        this.getData();
        console.log("请求数据");
      }
    } catch (e) {
      throw e;
    }
  },
});
