// 导出页面为pdf格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install (Vue, options) { //全局函數 getPdf
    Vue.prototype.getPdf = function (id, title) { // 页面id， pdf名称
      // 需要转换成图片的原生DOM元素
      const element = document.querySelector(id)
      let DPI = () => {
        for (let i = 56; i < 2000; i++) {
          if (matchMedia("(max-resolution: " + i + "dpi)").matches === true) {
            return i;
          }
        }
      }
      const PXTOPTRATE = 72/DPI(); // 1px => pt
      const PTTOPXRATE = DPI()/72; // 1pt => px
      // a4纸标准长宽
      const A4W = 595; // 单位：pt
      const A4H = 842; // 单位：pt
      // firstElementChild: 返回指定元素的第一个子元素
      let child = element.firstElementChild
      while(child) {
        let h = child.clientHeight
        // 打印内容的分页点小于一个A4纸高度时
        if (h < A4H * PTTOPXRATE && child.id == 'pagination') {
          let div = document.createElement('div')
          //计算div需要填充的高度
          div.style.height = (element.clientWidth*A4H/A4W - h) * PXTOPTRATE + 'pt'
          child.appendChild(div)
        } else {
          console.log(h%A4H * PTTOPXRATE)
        }
        // nextElementSibling: 返回指定元素之后的下一个兄弟元素
        child = child.nextElementSibling
      }
      // 获取添加空白内容后的宽高
      let w = element.clientWidth
      let h = element.clientHeight
      // 创建一个canvas节点
      let canvas = document.createElement('canvas')
      // 放大的倍数，提高清晰度
      let scale = 3
      canvas.width = w * scale
      canvas.height = h * scale

      // 获取context，设置scale:比例放大
      canvas.getContext('2d').scale(1, 1)
      let opts = {
        scale: scale, // 添加放大倍数的参数
        canvas: canvas, // 自定义canvas
        logging: true, // 日志开关，便于查看html2canvas的内部执行流程
        useCORS: true, // 开启跨域配置
        allowTaint: true, // 是否使用图片跨域
      }
      //
      html2Canvas(element, opts).then(function (canvas) {
        let contentWidth = canvas.width * PXTOPTRATE / scale
        let contentHeight = canvas.height * PXTOPTRATE / scale
        // 页面偏移
        let position = 0
        // 设定图片宽度与A4纸相同，求出A4比例下图片的高度
        let imgWidth = A4W
        let imgHeight = A4W * contentHeight / contentWidth
        // 未生成pdf的图片高度
        let leftHeinht = imgHeight
        // 将画布内容转化为base64
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        // addImage :
        // 第三，四个参数为定义 PDF 中图像左上角的数字
        // 第五，六个参数为定义图像宽度和高度的数字
        if ( leftHeinht <  A4H) {
          console.log('单页');
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeinht > 0) {
            console.log('分页');
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeinht -= A4H
            position -= A4H
            // 避免添加空白页  3：处理计算误差
            if (leftHeinht > 3) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      })
    }
  }
}
