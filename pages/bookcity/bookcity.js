// pages/bookcity/bookcity.js
import { requestGet, bookCityURL } from "../../utils/require";
Page({
  data: {
    male:[],
    female:[],
    press:[],
  },
  onLoad() {
    this.getBookSeriesData();
  },
  async getBookSeriesData() {
    const result = await requestGet(bookCityURL);
    // console.log(result)
    this.setData({
      male: result.male,
      female: result.female,
      press: result.press,
    });
  },
})