import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "待付款", "待发货", "退款/退货"],
    currentIndex: 0,
    orderData: [],
  },
  getData(index) {
    const token = wx.getStorageSync("token");
    const header = { Authorization: token };
    request({
      url: "/my/orders/all",
      methods: "POST",
      data: {
        type: index,
      },
      header,
    }).then((res) => {
      const message = res.data.message;
      message.orders.forEach((v) => {
        v.create_time = new Date(v.create_time * 1000)
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
        console.log(v.create_time);
      });
      this.setData({
        orderData: message,
      });
    });
  },
  onLoad: function (options) {
    this.setData({
      currentIndex: options.type - 1,
    });
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/index",
      });
    } else {
      this.getData(this.data.currentIndex);
    }
  },
  onShow() {
    this.getData(this.data.currentIndex);
  },
  itemClick(e) {
    const currentIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex,
    });
    this.getData(this.data.currentIndex);
  },
});
