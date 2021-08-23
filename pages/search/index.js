import { request, debounce } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message: [],
    debouncefun: undefined,
    isfocus: false,
    inputtext: "",
  },
  getData(value) {
    request({
      url: "/goods/qsearch?query=" + value,
    }).then((res) => {
      this.setData({
        message: res.data.message,
      });
    });
  },
  userInput(e) {
    const { value } = e.detail;
    if (!value.trim()) {
      this.setData({
        isfocus: false,
      });
      return;
    }
    this.setData({
      isfocus: true,
      inputtext: value,
    });
    this.data.debouncefun(value);
  },
  cancel() {
    this.setData({
      message: [],
      isfocus: false,
      inputtext: "",
    });
  },
  onLoad() {
    const debouncefun = debounce((inputdata) => {
      this.getData(inputdata);
    }, 1000);
    this.setData({
      debouncefun,
    });
  },
});
