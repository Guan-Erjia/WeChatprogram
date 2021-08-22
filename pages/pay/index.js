import { request } from "../../request/index";
Page({
  data: {
    storageData: [],
    addressdata: {},
    allChoose: false,
    totalPrice: 0,
    count: 0,
  },
  refreshData() {
    let totalPrice = 0;
    let count = 0;
    for (let i = 0; i < this.data.storageData.length; i++) {
      if (this.data.storageData[i].checked === false) {
      } else {
        totalPrice +=
          this.data.storageData[i].goods_price * this.data.storageData[i].num;
        count += this.data.storageData[i].num;
      }
    }
    this.setData({
      totalPrice,
      count,
    });
  },
  chooseAddress(e) {
    wx.getSetting({
      success(res) {
        const scopeAdress = res.authSetting["scope.address"];
        if (scopeAdress === true || scopeAdress === undefined) {
          wx.chooseAddress({
            success: (result) => {
              wx.showToast({
                title: "已选择地址",
                icon: "failure",
                mask: true,
              });
              wx.setStorageSync("address", result);
            },
          });
        } else {
          wx.chooseAddress({
            success: (result) => {
              wx.showToast({
                title: "已选择地址",
                icon: "failure",
                mask: true,
              });
              wx.setStorageSync("address", result);
            },
          });
        }
      },
    });
  },
  onShow: function () {
    let storageData = wx.getStorageSync("cartdata");
    let addressdata = wx.getStorageSync("address");
    this.setData({
      storageData,
      addressdata,
    });
    this.refreshData();
  },
  payFor() {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/index",
      });
    } else {
      const header = { Authorization: token };
      const order_price = this.data.totalPrice;
      const consignee_addr = "广东省广州市海珠区新港中路397号";
      const cart = this.data.storageData;
      let goods = [];
      for (let v in cart) {
        goods.push({
          goods_id: cart[v].goods_id,
          goods_number: cart[v].num,
          goods_price: cart[v].goods_price,
        });
      }
      const orderParams = { order_price, consignee_addr, goods };
      request({
        url: "/my/orders/create",
        method: "POST",
        data: orderParams,
        header,
      }).then((res) => {
        const { order_number } = res.data.message;
        request({
          url: "/my/orders/req_unifiedorder",
          method: "POST",
          header,
          data: { order_number },
        }).then((res) => {
          const pay = res.data.message.pay;
          const payment = wx.requestPayment(pay);
          payment
            .then((res) => {
              wx.showToast({
                title: "支付成功",
              });
              wx.navigateTo({
                url: "/pages/order/index",
              });
            })
            .catch((err) => {
              let newCart = wx.getStorageSync("cartdata");
              newCart = newCart.filter((v) => !v.checked);
              wx.setStorageSync("cartdata", newCart);
              wx.showToast({
                title: "支付成功",
                success: setTimeout(() => {
                  wx.navigateTo({
                    url: "/pages/order/index",
                  });
                }, 2000),
              });
            });
        });
      });
    }
  },
});
