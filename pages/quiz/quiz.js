var current = 1;
var curProggess=0;
var that;
var curAnswer;
var timer;
var proggessState;
function answerQuestion(id) {

  if (curAnswer == convert(id)) {
    wx.showToast({
      title: '回答正确',
      icon: 'success',
      duration: 1000
    })
    getQuestion();
    current = current + 1
    that.setData({
      cur: current,
      errorState: ""
    })
    proggessState = 1;

  }
  else {

    that.setData({ errorState: "正确答案:" + curAnswer });
    proggessState = 0;
  }

}

function convert(num) { //数字转大写字母
  var result = [];
  while (num) {
    var t = num % 26;
    if (!t) {
      t = 26;
      --num;
    }
    result.push(String.fromCodePoint(t + 64));
    num = ~~(num / 26);
  }
  return result.reverse().join('');
}
function getQuestion() {
  wx.request({
    url: 'https://quiz.morusang.com/getquestion.php', 
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: res => {
      that.setData(
        {
          question: res.data.question,
          sel1: res.data.A,
          sel2: res.data.B,
          sel3: res.data.C,
          sel4: res.data.D,
        }
      )
      curAnswer=res.data.answer;
      console.log(res.data)
    }
  })

}
Page({
  
data: {
  cur:1,
  progessColor: '0A64A4'
},
/**
   * 生命周期函数--监听页面初次渲染完成
   */
onReady: function () {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {
  proggessState = 1;
  timer = setInterval(  //进度条计时器
    function proggessing() {
      if (proggessState) {
        curProggess = curProggess + 0.35;
        if (curProggess < 100) {
          that.setData(
            {
              curPercent: curProggess,
              progessColor: '#0A64A4'

            }
          )

        }
        else if (curProggess >= 100 && curProggess <= 100.5) {
          that.setData({
            progessColor: '#FF1300'
          })
          wx.showToast({
            title: '回答超时',
            icon: 'none',
            duration: 1000
          })
        }
        else {

        }
      }
    }
    , 50
  )
  
},
  


/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {


},
onLoad: function()
{
  proggessState=1;
  that = this;  //将this传给that，此处的this可以调用setData
  this.setData({ cur: current })
  getQuestion();
},
  clickMe: event => {
    answerQuestion(event.currentTarget.id);
    curProggess = -5;
  }

})



