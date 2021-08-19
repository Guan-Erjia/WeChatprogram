// pages/index/index.js
import { request } from '../../request/index'
Page({
  data: {
    swiperList: [],
    navigator: {},
    floordata: {}
  },
  onLoad: function (options) {
    request({
      url: '/home/swiperdata',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
    request({
      url: '/home/catitems',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
    }).then(result => {
      this.setData({
        navigator: result.data.message
      })
    })
    request({
      url: '/home/floordata',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
    }).then(result => {
      this.setData({
        floordata: result.data.message
      })
    })
  }
})
