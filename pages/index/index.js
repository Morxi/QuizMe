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
    list: [
      {
        id: 'form',
        name: '来答题',
        open: false,
        pages: ['计算机', '其他科目敬请期待']
      },
      {
        id: 'widget',
        name: '基础组件',
        open: false,
        pages: ['article', 'badge', 'flex', 'footer', 'gallery', 'grid', 'icons', 'loadmore', 'panel', 'preview', 'progress']
      },
      // {
      //   id: 'about',
      //   name: '关于QuizMe',
      //   open: false,
      //   pages: ['article']
      // },

    ],
    isAboutOpen:false,
    isQuizOpen:false,
    motto: 'Hello World',
    saying: '加载中...',
    wxVersion: '加载中...',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  //事件处理函数
  customToggle: function(){
    
    var tempisAboutOpen = !this.data.isAboutOpen;
    this.setData({
      isAboutOpen : tempisAboutOpen
    })
  },
  quizToggle: function () {

    var tempisAboutOpen = !this.data.isQuizOpen;
    this.setData({
      isQuizOpen: tempisAboutOpen
    })
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    console.log(list)
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

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
      url: 'https://www.morusang.com/quiz/getsaying.php',
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
