//index.js
//获取应用实例
const app = getApp()
var still;
function getDateUntilEnding()
{
  var s1 = '2018-06-07';
  s1 = new Date(s1.replace(/-/g, "/"));
  var days = s1.getTime()-Date.now();
  still = parseInt(days / (1000 * 60 * 60 * 24));
}
Page({
  data: {
    motto: 'Hello World',
    saying: '加载中...',
    wxVersion: '加载中...',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../usercenter/usercenter'
    })
  },
  startQuiz: function () {
    wx.navigateTo({
      url: '../quiz/quiz?id=1'
    })
  },
  aboutQuiz: function () {
    wx.navigateTo({
      url: '../about/about?id=1'
    })
  },
  clickGTD: function(){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

      if(wx.getStorageSync('questdata')=="")
      {
      wx.setStorageSync('questdata', 0)
    }
    
   getDateUntilEnding();
    wx.setNavigationBarTitle({
      title: '距高考还有'+still+'天'
    })
    wx.request({
      url: 'https://quiz.morusang.com/getsaying.php',
      success: res => {
        console.log(res);
        this.setData({
          sayin: res.data
        })
      }
    })


    wx.request({
      url: 'https://www.morusang.com/quiz/version.html',
      success: res => {
        this.setData({
          version: res.data
        })
      }
    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          wxVersion: res.SDKVersion
        })

      }
    },
    )
    
  }}

)
