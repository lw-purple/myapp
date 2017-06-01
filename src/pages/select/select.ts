import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import echarts from 'echarts';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the SelectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
})
export class SelectPage {
  public _data :number =60
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
    
  }
  onBarcodeScanner(){
    this.barcodeScanner.scan().then((barcodeData) => {
    // Success! Barcode data is here
    
    }, (err) => {
    
        // An error occurred
    });
  }
  onPageScroll(event) {
    let position = event.scrollTop;//取滑动TOP值 
    if (position <= 100) {
      let transrate = 1 - position / 500;
      document.getElementById("home_header").style.backgroundColor = 'rgba(189,42,32,' + transrate + ')'
    }


  }
  ngAfterViewInit() {
    this.content.ionScroll.subscribe(this.onPageScroll);
    var myChart = echarts.init(<HTMLCanvasElement>document.getElementById('myChart'));

    myChart.setOption({
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      //下面属性才是仪表盘的核心！！反正我是这么认为的！！！
      series: [{
        //类型
        type: 'gauge',
        //半径
        radius: 130,
        //起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        startAngle: 180,
        //结束角度。
        endAngle: 0,
        center: ['50%', '90%'],
        //仪表盘轴线相关配置。
        axisLine: {
          show: true,
          // 属性lineStyle控制线条样式
          lineStyle: {
            width: 20,
            color: [[this._data / 100, '#91c7ae'], [1, '#c23531']]
          }
        },

        //分隔线样式。
        splitLine: {
          show: false,
        },
        //刻度样式。
        axisTick: {
          show: true,
          splitNumber:1
        },
        //刻度标签。
        axisLabel: {
          show: true,
        },
        //仪表盘指针。
        pointer: {
          //这个show属性好像有问题，因为在这次开发中，需要去掉指正，我设置false的时候，还是显示指针，估计是BUG吧，我用的echarts-3.2.3；希望改进。最终，我把width属性设置为0，成功搞定！
          show: true,
          //指针长度
          length: '90%',
          width: 3,
        },
        
        //仪表盘详情，用于显示数据。
        detail: {
          show: true,
          offsetCenter: [0, '-20%'],
          formatter: '{value}%',
          textStyle: {
            fontSize: 30
          }
        },
        data: [{
          value: this._data,
        }]
      }]
    })
    var myChart2 = echarts.init(<HTMLCanvasElement>document.getElementById('myChart2'),{
      width:'400px',
      height:'100px'
    });
 
    myChart2.setOption({
       radar: {
         radius:40,
        // shape: 'circle',
          indicator: [
            { name: '销售', max: 6500},
            { name: '管理', max: 16000},
            { name: '信息技术', max: 30000},
            { name: '客服', max: 38000},
            { name: '研发', max: 52000},
            { name: '市场', max: 25000}
          ]
      },
      series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data : [
              {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name : '预算分配（Allocated Budget）'
              },
              {
                  value : [5000, 14000, 28000, 31000, 42000, 21000],
                  name : '实际开销（Actual Spending）'
              }
          ]
      }]
    })
 
  }
}
