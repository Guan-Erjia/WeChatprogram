// pages/index/index.js
import { request } from "../../request/index";
Page({
  data: {
    swiperList: [],
    navigator: {},
    floordata: {},
  },
  onLoad: function (options) {
    request({
      url: "/home/swiperdata",
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
    }).then((result) => {
      result.data.message.map((v) => {
        let item = v.navigator_url.split("main");
        item = item[0] + "index" + item[1];
        v.navigator_url = item;
      });
      this.setData({
        swiperList: result.data.message,
      });
    });
    request({
      url: "/home/catitems",
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
    }).then((result) => {
      this.setData({
        navigator: result.data.message,
      });
    });
    request({
      url: "/home/floordata",
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
    }).then((result) => {
      let a = result.data.message;
      console.log(a);
      a.forEach((v) => {
        v.product_list.map((v) => {
          if (v.navigator_url) {
            let text = v.navigator_url.split("?");
            v.navigator_url = text[0] + "/index?" + text[1];
          }
          console.log(v);
        });
      });

      this.setData({
        floordata: result.data.message,
      });
    });
  },
});
