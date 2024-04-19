import store from "../../store/index.js"

const CustomFn = {
  // dateFormat("YYYY-mm-dd HH:MM", date)
  // 时间处理方法
  dateFormat(fmt, date) {
    if (date instanceof Date) {
      let ret;
      const opt = {
        "YY+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
      };
      date = fmt;
      return fmt;
    } else {
      return date;
    }
  },
  //下拉值兑换
  SelectFn(Arr, val) {
    let txt = ''
    for (let i = 0; i < Arr.length; i++) {
      if (Arr[i].value == val) {
        txt = Arr[i].label
      }
    }
    return txt == '' ? val : txt
  },

  isShowMenu(path) {
    return CustomFn.hasPower(path.substring(path.lastIndexOf('/') + 1), 'view');
  },

  hasPower(path, power) {
    for (let item of store.state.userPrivilege) {
      if (item.page_name == path && item.page_item == power) {
        return true;
      }
    }
    return false;
  },

  getArrayDistinctValue(arr, columns) {
    let hashobj = {}
    arr.map(item => {
      for (let column of columns) {
        (hashobj[column] = hashobj[column] || {})[item[column]] = 1
      }
    })
    Object.keys(hashobj).map(item => {
      hashobj[item] = Object.keys(hashobj[item])
    })
    return hashobj;
  },

  getSelectorValueByArray(arr, columns) {
    let hashobj = {}
    arr.map(item => {
      for (let column of columns) {
        (hashobj[column] = hashobj[column] || {})[item[column]] = 1
      }
    })
    Object.keys(hashobj).map(item => {
      hashobj[item] = Object.keys(hashobj[item]).map(item => {
        return {
          value: item,
          text: item
        }
      })
    })
    return hashobj;
  },

  // 自适应表格列宽
  flexColumnWidth(str, tableData, font='13px Avenir, Helvetica, Arial, sans-serif', flag = 'max') {
    // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
    // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
    // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
    str = str + ''
    let columnContent = ''
    let flexWidth = 0
    if (!tableData || !tableData.length || tableData.length === 0 || tableData === undefined) {
      return
    }
    if (!str || !str.length || str.length === 0 || str === undefined) {
      return
    }
    if (flag === 'equal') {
      // 获取该列中第一个不为空的数据(内容)
      // for (let i = 0; i < tableData.length; i++) {
      //   if (tableData[i][str].length > 0) {
      //     // console.log('该列数据[0]:', tableData[0][str])
      //     columnContent = tableData[i][str]
      //     continue
      //   }
      // }
    } else {
      // 获取该列中最长的数据(内容)
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i][str] === null) {
          continue;
        }
        let now_tempWidth = CustomFn.GetFontSize(tableData[i][str] + '', font) + 21
        if(flexWidth < now_tempWidth){
          flexWidth = now_tempWidth
        }
      }
    }

    if (flexWidth < 80) {
      // 设置最小宽度
      flexWidth = 80
    }
    // if (flexWidth > 250) {
    //   // 设置最大宽度
    //   flexWidth = 250
    // }
    return flexWidth + 'px'
  },

  // 计算文字宽度
  GetFontSize (text, font) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = font
    return Math.ceil(ctx.measureText(text).width)
  },
  //獲取當前日期  可傳 aa  加減日期返回yyyy-mm-dd格式
  getdatea(aa){
    var date = new Date()
    date.setDate(date.getDate()+aa);
    var time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    return time
    },
}

const install = function(vm, options) { //插件必须有这样一个install方法。
  vm.prototype._CustomFn = CustomFn;
}
export default {
  install,
  CustomFn
}
