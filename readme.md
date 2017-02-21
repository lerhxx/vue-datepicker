#vue-datepicker
基于 vuejs 2.x 可自定义主题的日期组件

[DEMO][3]

##Installation

```
npm install aotu-calendar --save
```

##Usage

只需要在项目中加入 calendar.vue，就可以使用了。


```
<calendar></calendar>
```

![native][1]

向组件传入 prop 即可改变 calendar 的样式

```
<caleendar theme='#800080' type='range' iconUrl='./images/icon.png'></caleendar>
```
![demo][2]

##Props
* `type(String)`: 默认 single（选择单天），可选 range（选择多天） / time（选择单天 + 时间）

* `isAbandon(Boolean)`: 默认 true，早于系统日期的日期选项是否不可选

* `showInput(Boolean)`: 默认 true，是否展示输入框

* `inputwidth`: 默认“259px”，显示框的宽度

* `theme(String)`: 默认 #e57373，主题色

* `themepannelbg(String)`: 默认 #fff，pannel 背景颜色

* `themeheadercolor(String)`: 默认 #fff，pannel 头部字体颜色

* `themeheaderyear(String)`: 默认为空，pannel 头部年份字体颜色，为空则跟随 themeheadercolor 值

* `themeheadermonth(String)`: 默认为空，pannel 头部月份字体颜色，为空则跟随 themeheadercolor 值

* `themeheadersep(String)`: 默认为空，pannel 头部“/”字体颜色，为空则跟随 themeheadercolor 值

* `themeleftarrow(String)`: 默认为空，pannel 头部左箭头颜色，为空则跟随 themeheadercolor 值

* `themerightarrow(String)`: 默认为空，pannel 头部右箭头颜色，为空则跟随 themeheadercolor 值

* `themeheaderbg(String)`: 默认为空，pannel 头部背景颜色，为空则跟随 theme 值

* `themeweekcolor(String)`: 默认为空，星期字体颜色，为空则跟随 theme 值

* `themeborder(String)`: 默认为空，底部边框，为空则 color 跟随 theme 值, width = 1px, style = solid

* `themeselbg(String)`: 默认为空，选中日期背景颜色，为空则跟随 theme 值

* `themeselcolor(String)`: 默认 #fff，选中日期字体颜色

* `themebtnborder(String)`: 默认为空，按钮边框颜色，为空则跟随 theme 值

* `themebtnconbg(String)`: 默认为空，确认按钮背景颜色，为空则跟随 theme 值

* `themebtncanbg(String)`: 默认 #fff，取消按钮背景颜色

* `themebtnconfirmcolor(String)`: 默认 #fff，确认按钮字体颜色

* `themebtncanclecolor(String)`: 默认 #000，取消按钮字体颜色

* `themecurmonthcolor(String)`: 默认 #000，当前月份日期的字体颜色

* `themeprevmonthcolor(String)`: 默认 #aaa，上月日期的字体颜色

* `themenextmonthcolor(String)`: 默认 #aaa，下月份日期的字体颜色

* `themenotallowcolor(String)`: 默认 #aaa，无效日期的字体颜色，仅 isAbandon 为 true 有效

##event
`getValue()`: 获取选中的日期

`getStartTime()`: 获取选中的开始日期

`getEndTime()`: 获取选中的结束日期

[1]: https://github.com/lerhxx/vue-datepicker/blob/gh-pages/images/native.png
[2]: https://github.com/lerhxx/vue-datepicker/blob/gh-pages/images/demo.png
[3]: https://lerhxx.github.io/vue-datepicker/demo.html
