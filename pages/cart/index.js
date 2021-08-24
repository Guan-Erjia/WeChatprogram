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
    let allChoose = true;
    let count = 0;
    for (let i = 0; i < this.data.storageData.length; i++) {
      if (this.data.storageData[i].checked === false) {
        allChoose = false;
      } else {
        totalPrice +=
          this.data.storageData[i].goods_price * this.data.storageData[i].num;
        count += this.data.storageData[i].num;
      }
    }
    this.setData({
      totalPrice,
      allChoose,
      count,
    });
  },
  chooseAdress(e) {
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
            fail: (result) => {
              wx.showToast({
                title: "获取地址失败",
                icon: "failure",
                mask: true,
              });
              wx.openSetting({
                withSubscriptions: true,
              });
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
            fail: (result) => {
              wx.showToast({
                title: "获取地址失败",
                icon: "none",
                mask: true,
              });
              wx.openSetting({
                withSubscriptions: true,
              });
            },
          });
        }
      },
    });
  },
  chooseGood(e) {
    let index = e.currentTarget.dataset.item;
    this.data.storageData[index].checked = !this.data.storageData[index]
      .checked;
    wx.setStorageSync("cartdata", this.data.storageData);
    this.refreshData();
  },
  chooseAll() {
    let flag = !this.data.allChoose;
    let storageData = this.data.storageData;
    for (let i = 0; i < storageData.length; i++) {
      storageData[i].checked = flag;
    }
    this.setData({
      storageData,
    });
    wx.setStorageSync("cartdata", this.data.storageData);
    this.refreshData();
  },
  decrease(e) {
    let storageData = this.data.storageData;
    console.log(e.currentTarget.dataset.item);
    if (storageData[e.currentTarget.dataset.item].num === 1) {
      wx.showModal({
        title: "提示",
        content: "是否删除本商品",
        success: (res) => {
          if (res.confirm) {
            storageData.splice(e.currentTarget.dataset.item, 1);
            this.setData({
              storageData,
            });
            this.refreshData();
          }
        },
      });
    } else {
      storageData[e.currentTarget.dataset.item].num -= 1;
    }
    this.setData({
      storageData,
    });
    wx.setStorageSync("cartdata", this.data.storageData);
    this.refreshData();
  },
  increase(e) {
    let storageData = this.data.storageData;
    storageData[e.currentTarget.dataset.item].num += 1;
    this.setData({
      storageData,
    });
    wx.setStorageSync("cartdata", this.data.storageData);
    this.refreshData();
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
  account() {
    if (this.data.addressdata.userName) {
      if (this.data.count === 0) {
        wx.showToast({
          title: "请添加商品",
        });
      } else {
        wx.navigateTo({
          url: "/pages/pay/index",
        });
      }
    } else {
      wx.showToast({
        title: "请添加收货地址",
      });
    }
  },
});
