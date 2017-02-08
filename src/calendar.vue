<template>
    <div class='calendar'>
        <div class='input-wrapper'>
            <i class='date-icon'></i>
            <div class='input' v-text='value' @click='onTogglePanel'></div>
            <span class='input-clear' @click='clearValue'></span>
        </div>
        <transition name='toggle'>
            <div class='pannel-wrapper' v-show='togglePanel'>
                <div class='pannel-header'>
                    <span class='year' v-text='tmpYear'></span>/<span class='month' v-text='tmpMonth + 1'></span>
                    <span class='prev' @click='prevMonth'>&lt;</span>
                    <span class='next' @click='nextMonth'>&gt;</span>
                </div>
                <div class='date-list'>
                    <ul class='week'>
                        <li v-for='item in weekList'>{{week(item, lang)}}</li>
                    </ul>
                    <ul class='date'>
                        <li v-for='item in dateList' :class="{selected: isSelected(item, 'date'), 'notCurMonth': !item.isCurMonth, unvalid: !validDate(item)}" @click='selectDate(item)'>{{item.value}}</li>
                    </ul>
                </div>
                <div class='group-btn'>
                    <button type='button' class='btn btn-confirm' @click='confirmSelect'>确认</button>
                    <button type='button' class='btn @click='cancleSelect>取消</button>
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
                lang: 'zh',
                format: '-',
                weekList: [0, 1, 2, 3, 4, 5, 6],
                monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                minDate: curDate.getDate()
            }
        },
        props: {
            type: {
                type: String,
                default: 'range'            //range
            },
            isAbandon: {
                type: Boolean,
                default: false
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
            isSelected(item, type) {
                switch(type) {
                    case 'date':
                        let mon = this.tmpMonth;
                        let time;
                        item.isPrevMonth && mon--;
                        item.isNextMonth && mon++;

                        time = new Date(this.tmpYear, mon, item.value).getTime()

                        return time >= new Date(this.startYear, this.startMonth, this.startDate).getTime() && time <= new Date(this.endYear, this.endMonth, this.endDate).getTime();
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
            selectDate(item){
                if(!this.validDate(item)) return;

                //是否修改月份
                item.isPrevMonth ? (this.tmpMonth === 0 ? (--this.tmpYear,this.tmpMonth = 11) : --this.tmpMonth) : (item.isNextMonth ? (this.tmpMonth === 11 ? (++this.tmpYear, this.tmpMonth = 0) : ++this.tmpMonth) : (this.tmpYear, this.tmpMonth));

                switch(this.type) {
                    case 'single':
                        this.startDate = this.endDate = item.value;
                        this.startYear = this.endYear = this.tmpYear;
                        this.startMonth = this.endMonth = this.tmpMonth;
                        break;
                    case 'range':
                        let selTime = new Date(this.tmpYear, this.tmpMonth, item.value).getTime(),
                            startTime = new Date(this.startYear, this.startMonth, this.startDate).getTime(),
                            endTime = new Date(this.endYear, this.endMonth, this.endDate).getTime();
                        selTime <= startTime ? (this.startYear = this.tmpYear, this.startMonth = this.tmpMonth, this.startDate = item.value) : (this.endYear = this.tmpYear, this.endMonth = this.tmpMonth, this.endDate = item.value);
                        // selTime > endTime ? (this.endYear = this.tmpYear, this.endMonth = this.tmpMonth, this.endDate = item.value) : (this.startYear = this.tmpYear, this.startMonth = this.tmpMonth, this.startDate = item.value);
                        // if(selTime < startTime) {
                        //     this.startYear = this.tmpYear;
                        //     this.startMonth = this.tmpMonth;
                        //     this.startDate = item.value;
                        // }else if(selTime < endTime) {

                        // }
                        break;
                    default:
                        this.value = '';
                }
            },
            prevMonth() {
                this.tmpMonth === 0 ? (--this.tmpYear,this.tmpMonth = 11) : --this.tmpMonth;
            },
            nextMonth() {
                this.tmpMonth === 11 ? (++this.tmpYear, this.tmpMonth = 0) : ++this.tmpMonth;
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
            },
            confirmSelect() {
                this.changeValue();
                this.togglePanel = !this.togglePanel;
            },
            cancleSelect() {
                this.togglePanel = !this.togglePanel;
            }
        },
        computed: {
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
            }
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
            absolute(top 4px right 5px)
            width 20px
            height 20px
            &:before,
            &:after
                absolute(top 50% left 0)
                width 100%
                height 2px
                content ''
                background #000
            &:before
                transform rotate(45deg)
            &:after
                transform rotate(-45deg)
        .pannel-wrapper
            width width
            height ((li-width + li-margin * 2) * 6 + 125)
            border-bottom 1px solid header-color
            margin-top 5px
            background #fff
        .pannel-header
            relative()
            padding 3px
            text-align center
            color #fff
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
        .date-list
            li
                width li-width
                margin li-margin
                text-align center
                font-size 1em
                cursor default
        .week
            margin 10px 0 5px
            li
                color header-color
                font-weight bold
        .date
            li
                height li-width
                line-height li-width
                cursor pointer
            .notCurMonth,
            .unvalid
                color #aaa
            .unvalid
                cursor not-allowed
        .selected
            color #fff
            background-color header-color
            border-radius(20px)
        .group-btn
            margin 10px 0
            text-align center
        .btn
            padding 8px 15px
            margin 0 15px
            border 1px solid header-color
            font-size 16px
            background #fff
            border-radius(10px)
            box-sizing border-box
        .btn-confirm
            color #fff
            background header-color
</style>