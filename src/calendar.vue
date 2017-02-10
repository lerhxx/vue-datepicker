<template>
    <div class='calendar'>
        <div class='input-wrapper' v-show='showInput'>
            <i class='date-icon'></i>
            <div class='input' v-text='value' @click='onTogglePanel'></div>
            <span class='input-clear' @click='clearValue'></span>
        </div>
        <transition name='toggle'>
            <div class='pannel-wrapper' :style='themePannel' v-show='togglePanel'>
                <div class='pannel-header' :style='themeHeaderBg'>
                    <span class='year' :style='themeHeaderYear' v-text='tmpYear' @click='showYearPannel'></span><span :style='themeHeaderSep'>/</span><span class='month' :style='themeHeaderMonth' v-text='tmpMonth + 1' @click='showMonthPannel'></span>
                    <span class='prev' @click='prevMonth' :style='themeLeftArrow' v-show='pannelType !== "month"'>&lt;</span>
                    <span class='next' @click='nextMonth' :style='themeRightArrow' v-show='pannelType !== "month"'>&gt;</span>
                </div>
                <div class='year-list' v-show='pannelType === "year"'>
                    <ul class='month-wrapper'>
                        <li v-for='item in yearList' :class="{selected: isSelected(item, 'year')}" @click='selectYear(item)'>{{item}}</li>
                    </ul>
                </div>
                <div class='month-list' v-show='pannelType === "month"'>
                    <ul class='month-wrapper'>
                        <li v-for='item in monthList' :class="{selected: isSelected(item, 'month')}" @click='selectMonth(item)'>{{month(item, lang)}}</li>
                    </ul>
                </div>
                <div class='date-list' v-show='pannelType === "date" || pannelType === "time"'>
                    <ul class='week'>
                        <li v-for='item in weekList' :style='themeWeekColor'>{{week(item, lang)}}</li>
                    </ul>
                    <ul class='date'>
                        <li v-for='item in dateList' :class="{selected: isSelected(item, 'date'), 'notCurMonth': !item.isCurMonth, unvalid: !validDate(item)}" @click='selectDate(item)' :style='setSeltheme(item, "date")'>{{item.value}}</li>
                    </ul>
                    <div class='time' v-show='pannelType ==="time"'>
                        <input type='text' v-model='startHour' @focus='checkTime("startHour")' @blur='clearCheck'/> : <input type='text' v-model='startMin'  @focus='checkTime("startMin")' @blur='clearCheck'/> - <input type='text' v-model='endHour'  @focus='checkTime("endHour")' @blur='clearCheck'/> : <input type='text' v-model='endMin'  @focus='checkTime("endMin")' @blur='clearCheck'/>
                    </div>
                </div>
                <div class='group-btn'>
                    <button type='button' class='btn btn-confirm' @click='confirmSelect' :style='themeBtnCon'>确认</button>
                    <button type='button' class='btn btn-cancle' @click='cancleSelect' :style='themeBtnCan'>取消</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            let curDate = new Date();
            return {
                value: '',
                togglePanel: true,
                pannelType: 'time',
                curYear: curDate.getFullYear(),
                curMonth: curDate.getMonth(),
                curDate: curDate.getDate(),
                tmpYear: curDate.getFullYear(),
                tmpMonth: curDate.getMonth(),
                tmpDate: curDate.getDate(),
                startYear: curDate.getFullYear(),
                startMonth: curDate.getMonth(),
                startDate: curDate.getDate(),
                endYear: curDate.getFullYear(),
                endMonth: curDate.getMonth(),
                endDate: curDate.getDate(),
                startHour: '0',
                startMin: '0',
                endHour: '0',
                endMin: '0',
                page: 0,
                lang: 'zh',
                format: '-',
                weekList: [0, 1, 2, 3, 4, 5, 6],
                monthList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                minDate: curDate.getDate(),
                flag: true,
                check: '',
                themePannel: {
                    borderBottom: this.themeborder ? this.themeborder : `1px solid ${this.theme}`,
                    backgroundColor: this.themepannelbg
                },
                themeHeaderYear: {
                    color: this.themeheaderyear ? this.themeheaderyear : this.themeheadercolor
                },
                themeHeaderMonth: {
                    color: this.themeheadermonth ? this.themeheadermonth : this.themeheadercolor
                },
                themeHeaderSep: {
                    color: this.themeheadersep ? this.themeheadersep : this.themeheadercolor
                },
                themeLeftArrow: {
                    color: this.themeleftarrow ? this.themeleftarrow : this.themeheadercolor
                },
                themeRightArrow: {
                    color: this.themerightarrow ? this.themerightarrow : this.themeheadercolor
                },
                themeHeaderBg: {
                    backgroundColor: this.themeheaderbg ? this.themeheaderbg : this.theme
                },
                themeWeekColor: {
                    color: this.themeweekcolor ? this.themeweekcolor : this.theme
                },
                themeBtnCon: {
                    border: this.themebtnborder ? this.themebtnborder : `1px solid ${this.theme}`,
                    color: this.themebtnconfirmcolor,
                    backgroundColor: this.themebtnconbg ? this.themebtnconbg : this.theme
                },
                themeBtnCan: {
                    border: this.themebtnborder ? this.themebtnborder : `1px solid ${this.theme}`,
                    color: this.themebtncanclecolor,
                    backgroundColor: this.themebtncanbg ? this.themebtncanbg : this.theme
                }
            }
        },
        props: {
            type: {
                type: String,
                default: 'single'            //range
            },
            isAbandon: {
                type: Boolean,
                default: true
            },
            showInput: {
                type: Boolean,
                default: true
            },
            theme: {
                type: String,
                default: '#e57373'
            },
            themepannelbg: {
                type: String,
                default: '#fff'
            },
            themeheadercolor: {
                type: String,
                default: '#fff'
            },
            themeheaderyear: {
                type: String,
                default: ''
            },
            themeheadermonth: {
                type: String,
                default: ''
            },
            themeheadersep: {
                type: String,
                default: ''
            },
            themeleftarrow: {
                type: String,
                default: ''
            },
            themerightarrow: {
                type: String,
                default: ''
            },
            themeheaderbg: {
                type: String,
                default: ''
            },
            themeweekcolor: {
                type: String,
                default: ''
            },
            themeborder: {
                type: String,
                default: ''
            },
            themeselbg: {
                type: String,
                default: ''
            },
            themeselcolor: {
                type:String,
                default: '#fff'
            },
            themebtnborder: {
                type: String,
                default: ''
            },
            themebtnconbg: {
                type: String,
                default: ''
            },
            themebtncanbg: {
                type: String,
                default: '#fff'
            },
            themebtnconfirmcolor: {
                type: String,
                default: '#fff'
            },
            themebtncanclecolor: {
                type: String,
                default: '#000'
            },
            themecurmonthcolor: {
                type: String,
                default: '#000'
            },
            themeprevmonthcolor: {
                type: String,
                default: '#aaa'
            },
            themenextmonthcolor: {
                type: String,
                default: '#aaa'
            },
            themenotallowcolor: {
                type: String,
                default: '#aaa'
            }
        },
        created() {
            this.changeValue();
        },
        methods: {
            onTogglePanel() {
                this.togglePanel = !this.togglePanel;
            },
            clearValue() {
                this.date = '';
            },
            showYearPannel() {
                this.pannelType = 'year';
            },
            showMonthPannel() {
                this.pannelType = 'month';
            },
            isSelected(item, type) {
                switch(type) {
                    case 'year':
                        return item === this.tmpYear;
                    case 'month':
                        return item === this.tmpMonth;
                    case 'date':
                        let mon = this.tmpMonth;
                        let time;
                        item.isPrevMonth && mon--;
                        item.isNextMonth && mon++;

                        time = new Date(this.tmpYear, mon, item.value).getTime()

                        return time >= new Date(this.startYear, this.startMonth, this.startDate).getTime() && time <= new Date(this.endYear, this.endMonth, this.endDate).getTime();
                }
            },
            month(item, lang) {
                switch (lang) {
                    case 'en':
                        return {0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'}[item]
                    case 'zh':
                        return {0: '一', 1: '二', 2: '三', 3: '四', 4: '五', 5: '六', 6: '七', 7: '八', 8: '九', 9: '十', 10: '十一', 11: '十二'}[item]
                    default:
                        return item
                }
            },
            week(item, lang) {
                switch (lang) {
                    case 'en':
                        return {0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa'}[item]
                    case 'zh':
                        return {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'}[item]
                    default:
                        return item
                }
            },
            validDate(item) {
                if(this.isAbandon) {
                    let mon = item.isCurMonth ? this.tmpMonth : (item.isPrevMonth ? this.tmpMonth - 1 : this.tmpMonth + 1);
                    return new Date(this.tmpYear, mon, item.value).getTime() >= new Date(this.curYear, this.curMonth, this.curDate).getTime()
                }
                return true;
            },
            selectYear(item) {
                this.tmpYear = item;
            },
            selectMonth(item) {
                this.tmpMonth = item;
            },
            selectDate(item){
                if(!this.validDate(item)) return;
                //是否修改月份
                item.isPrevMonth ? (this.tmpMonth === 0 ? (--this.tmpYear,this.tmpMonth = 11) : --this.tmpMonth) : (item.isNextMonth ? (this.tmpMonth === 11 ? (++this.tmpYear, this.tmpMonth = 0) : ++this.tmpMonth) : (this.tmpYear, this.tmpMonth));

                switch(this.type) {
                    case 'single':
                        this.startDate = this.endDate = item.value;
                        this.startMonth = this.endMonth = this.tmpMonth;
                        this.startYear = this.endYear = this.tmpYear;
                        break;
                    case 'range':
                        if(this.startYear && this.startMonth && this.startDate && this.endYear && this.endMonth && this.endDate) {
                            let selTime = new Date(this.tmpYear, this.tmpMonth, item.value).getTime(),
                                startTime = new Date(this.startYear, this.startMonth, this.startDate).getTime(),
                                endTime = new Date(this.endYear, this.endMonth, this.endDate).getTime();
                            
                            if(selTime < startTime) {
                                this.startYear = this.tmpYear;
                                this.startMonth = this.tmpMonth;
                                this.startDate = item.value;
                                this.flag = true;
                            }else if(selTime > endTime) {
                                this.endYear = this.tmpYear;
                                this.endMonth = this.tmpMonth;
                                this.endDate = item.value;
                                this.flag = false;
                            }else if (selTime > startTime && selTime < endTime) {
                                this.flag ? (this.startYear = this.tmpYear, this.startMonth = this.tmpMonth, this.startDate = item.value) : (this.endYear = this.tmpYear, this.endMonth = this.tmpMonth, this.endDate = item.value);
                            }
                        }else {
                            this.startDate = this.endDate = item.value;
                            this.startMonth = this.endMonth = this.tmpMonth;
                            this.startYear = this.endYear = this.tmpYear;
                        }
                        break;
                    default:
                        this.value = '';
                }
            },
            prevMonth() {
                if(this.pannelType === 'date') {
                    this.tmpMonth === 0 ? (--this.tmpYear,this.tmpMonth = 11) : --this.tmpMonth;
                }else if(this.pannelType === 'year') {
                    --this.page;
                }
            },
            nextMonth() {
                if(this.pannelType === 'date') {
                    this.tmpMonth === 11 ? (++this.tmpYear, this.tmpMonth = 0) : ++this.tmpMonth;
                }else if(this.pannelType === 'year') {
                    ++this.page;
                }
            },
            changeValue() {
                switch(this.type) {
                    case 'single':
                        this.value = `${this.startYear}${this.format}${this.startMonth + 1}${this.format}${this.startDate}`;
                        break;
                    case 'range':
                        this.value = `${this.startYear}${this.format}${this.startMonth + 1}${this.format}${this.startDate} -- ${this.endYear}${this.format}${this.endMonth + 1}${this.format}${this.endDate}`;
                        break;
                    default:
                        this.value = '';
                }
            },
            clearValue() {
                this.value = '';
                this.startYear = this.startMonth = this.startDate = this.endYear = this.endMonth = this.endDate = '';
            },
            confirmSelect() {
                if(this.pannelType === 'year') {
                    this.pannelType = 'month';
                }else if(this.pannelType === 'month'){
                    this.pannelType = 'date';
                    this.startYear = this.startMonth = this.startDate = this.endYear = this.endMonth = this.endDate = '';
                }else {
                    this.changeValue();
                    this.togglePanel = !this.togglePanel;
                }
            },
            cancleSelect() {
                this.togglePanel = !this.togglePanel;
                this.pannelType = 'date';
                this.tmpYear = this.startYear = this.endYear = this.curYear;
                this.tmpMonth = this.startMonth = this.endMonth = this.curMonth;
                this.tmpDate = this.startDate = this.endDate = this.curDate;
            },
            setSeltheme(item, type) {
                if(!this.validDate(item)) {
                    return `color:${this.themenotallowcolor}`;
                }else if(this.isSelected(item, type)) {
                    let bg = this.themeselbg ? this.themeselbg : this.theme;
                    return `backgroundColor:${bg};color:${this.themeselcolor}`;
                }else {
                    if(item.isCurMonth) {
                        return `color:${this.themecurmonthcolor}`;
                    }else if(item.isPrevMonth) {
                        return `color:${this.themeprevmonthcolor}`;
                    }else {
                        return `color:${this.themenextmonthcolor}`;
                    }
                }
            },
            checkTime(type){
                let self = this;
                // time = time * 1;
                this.check = setInterval(function() {
                    switch(type) {
                        case 'startHour':
                        case 'endHour':
                            self[type] = self[type] > 23 ? 23 : (self[type] > 0 ? self[type] * 1 : 0); 
                            break;
                        case 'startMin':
                        case 'endMin':
                            self[type] = self[type] > 59 ? 59 : (self[type] > 0 ? self[type] * 1 : 0); 
                            break;
                    }
                }, 500)
            },
            clearCheck() {
                let self = this;
                clearInterval(self.check);
            }
        },
        computed: {
            yearList() {
                return Array.from({length: 12}, (val, index) => {
                    return this.curYear + index + 12 * this.page;
                })
            },
            dateList() {
                let tmpMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate();
                let dateList = Array.from({length: tmpMonthLength}, (val, index) => {
                        return {
                            isCurMonth: true,
                            value: index + 1
                        }
                    });
                let firstDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay();
                let lastMonthLength = new Date(this.tmpYear, this.tmpMonth, 0).getDate();
                let len,
                    i;

                for(i = lastMonthLength; i > lastMonthLength - firstDay; --i) {
                    dateList.unshift({
                        isPrevMonth: true,
                        value: i
                    })
                }
                for(i = 0, len = dateList.length; i + len < 42; ++i) {
                    dateList.push({
                        isNextMonth: true,
                        value: i + 1
                    })
                }
                return dateList;
            },
        }
    }
</script>

<style lang='stylus'>
    @import './styl/funs';

    li-width = 35px
    li-margin = 1px
    width = ((li-width + li-margin * 2) * 7)
    header-color = #e57373

    .calendar
        ul
            padding 0
            margin 0
        li
            display inline-block
            list-style none
        .input-wrapper
            relative()
            display inline-block
        .date-icon
            absolute(top 5px left 5px)
            width 20px
            height 20px
            background url(../dist/imgs/calendar.svg)
            background-size contain
        .input
            width width
            height 30px
            padding 5px
            padding-left 30px
            border 1px solid #ddd
            box-sizing border-box
        .input-clear
            absolute(top 6px right 6px)
            width 16px
            height 16px
            &:before,
            &:after
                absolute(top 50% left 0)
                width 100%
                height 2px
                content ''
                background #aaa
            &:before
                transform rotate(45deg)
            &:after
                transform rotate(-45deg)
        .pannel-wrapper
            width width
            margin-top 5px
            background #fff
        .pannel-header
            relative()
            padding 3px
            margin-bottom 10px
            color #fff
            text-align center
            font-size 1.5em
            background-color header-color
            border-radius(30px)
        .year,
        .month
            display inline-block
            margin 0 5px
            cursor pointer
        .prev,
        .next
            absolute(top 5px)
            cursor pointer
        .prev
            left 10px
        .next
            right 10px
        .month-wrapper
            width (li-width * 9 / 2)
            margin 0 auto
            li
                width (li-width * 3 / 2)
                padding 5px 0
                text-align center
                cursor pointer
        .date-list
            li
                width li-width
                margin li-margin
                text-align center
                font-size 1em
                cursor default
        .week
            margin-bottom 5px
            li
                color header-color
                font-weight bold

        .date
            li
                height li-width
                color #000
                line-height li-width
                cursor pointer
            .notCurMonth,
            .unvalid
                color #aaa
            .unvalid
                cursor not-allowed
        .time
            margin 10px 0 15px
            text-align center
            input
                width 30px
                outline none
                text-align center
        .selected
            color #fff
            background-color header-color
            border-radius(20px)
        .group-btn
            margin 10px 0
            border-group 1px solid header-color
            text-align center
        .btn
            padding 8px 15px
            margin 0 15px
            border 1px solid header-color
            outline none
            font-size 16px
            background #fff
            border-radius(10px)
            box-sizing border-box
        .btn-confirm
            color #fff
            background header-color
        .btn-cancle
            color #000
            background #fff
</style>