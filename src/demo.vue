<template>
	<div>
		<calendar
			:iconUrl='iconUrl'
			:theme='theme'
			:themepannelbg='themePannelBg'
			:themeheadercolor='themeHeaderColor'
			:themeheaderbg='themeHeaderBg'
			:themeheaderyear='themeHeaderYear'
			:themeheadermonth='themeHeaderMonth'
			:themeheadersep='themeHeaderSep'
			:themeleftarrow='themeLeftArrow'
			:themerightarrow='themeRightArrow'
			:themeweekcolor='themeWeekColor'
			:themebtnconbg='themeBtnConBg'
			:themebtnconfirmcolor='themebtnConfirmColor'
			:themebtncanbg='themeBtnCanBg'
			:themebtncanclecolor='themebtnCancleColor'
			:themeselbg='themeSelBg'
			:themeselcolor='themeSelColor'
			:themecurmonthcolor='themeCurmonthColor'
			:themeprevmonthcolor='themePrevMonthColor'
			:themenextmonthcolor='themeNextMonthColor'
			:themenotallowcolor='themeNotAllowColor'
			:themeborder='themeBorderR'
			:type='type'
			v-on:getValue='getTimeValue'
		></calendar>
		<div class='select-wrapper'>
			<div class='group'>
				<label>getValue:</label>
				<span>{{value}}</span>
			</div>
			<div class='group'>
				<label>type:</label>
				<select v-model='type'>
					<option>single</option>
					<option>range</option>
					<option>time</option>
				</select>
			</div>
			<!-- <div class='group'>
				<label>iconUrl:</label>
				<input type='file' @change='setIconUrl'/>
				<button @click='clear("iconUrl")'>clear</button>
			</div> -->
			<div class='group'>
				<label>theme:</label>
				<input type='color' v-model='theme'/>
				<button @click='clear("theme")'>clear</button>
			</div>
<!-- 			<div class='group'>
				<label>themepannelbg:</label>
				<input type='color' v-model='themePannelBg'/>
				<button @click='clear("themePannelBg")'>clear</button>
			</div>
			<div class='group'>
				<label>themeheadercolor:</label>
				<input type='color' v-model='themeHeaderColor'/>
				<button @click='clear("themeHeaderColor")'>clear</button>
			</div>
			<div class='group'>
				<label>themeheaderbg:</label>
				<input type='color' v-model='themeHeaderBg'/>
				<button @click='clear("themeHeaderBg")'>clear</button>
			</div>
			<div class='group'>
				<label>themeheaderyear:</label>
				<input type='color' v-model='themeHeaderYear'/>
				<button @click='clear("themeHeaderYear")'>clear</button>
			</div>
			<div class='group'>
				<label>themeheadermonth:</label>
				<input type='color' v-model='themeHeaderMonth'/>
				<button @click='clear("themeHeaderMonth")'>clear</button>
			</div>
			<div class='group'>
				<label>themeheadersep:</label>
				<input type='color' v-model='themeHeaderSep'/>
				<button @click='clear("themeHeaderSep")'>clear</button>
			</div>
			<div class='group'>
				<label>themeleftarrow:</label>
				<input type='color' v-model='themeLeftArrow'/>
				<button @click='clear("themeLeftArrow")'>clear</button>
			</div>
			<div class='group'>
				<label>themerightarrow:</label>
				<input type='color' v-model='themeRightArrow'/>
				<button @click='clear("themeRightArrow")'>clear</button>
			</div>
			<div class='group'>
				<label>themeweekcolor:</label>
				<input type='color' v-model='themeWeekColor'/>
				<button @click='clear("themeWeekColor")'>clear</button>
			</div>
			<div class='group'>
				<label>themebtnconbg:</label>
				<input type='color' v-model='themeBtnConBg'/>
				<button @click='clear("themeBtnConBg")'>clear</button>
			</div>
			<div class='group'>
				<label>themebtnconfirmcolor:</label>
				<input type='color' v-model='themebtnConfirmColor'/>
				<button @click='clear("themebtnConfirmColor")'>clear</button>
			</div>
			<div class='group'>
				<label>themebtncanbg:</label>
				<input type='color' v-model='themeBtnCanBg'/>
				<button @click='clear("themeBtnCanBg")'>clear</button>
			</div>
			<div class='group'>
				<label>themebtncanclecolor:</label>
				<input type='color' v-model='themebtnCancleColor'/>
				<button @click='clear("themebtnCancleColor")'>clear</button>
			</div>
			<div class='group'>
				<label>themeselbg:</label>
				<input type='color' v-model='themeSelBg'/>
				<button @click='clear("themeSelBg")'>clear</button>
			</div>
			<div class='group'>
				<label>themeselcolor:</label>
				<input type='color' v-model='themeSelColor'/>
				<button @click='clear("themeSelColor")'>clear</button>
			</div>
			<div class='group'>
				<label>themecurmonthcolor:</label>
				<input type='color' v-model='themeCurmonthColor'/>
				<button @click='clear("themeCurmonthColor")'>clear</button>
			</div>
			<div class='group'>
				<label>themeprevmonthcolor:</label>
				<input type='color' v-model='themePrevMonthColor'/>
				<button @click='clear("themePrevMonthColor")'>clear</button>
			</div>
			<div class='group'>
				<label>themenextmonthcolor:</label>
				<input type='color' v-model='themeNextMonthColor'/>
				<button @click='clear("themeNextMonthColor")'>clear</button>
			</div>
			<div class='group'>
				<label>themenotallowcolor:</label>
				<input type='color' v-model='themeNotAllowColor'/>
				<button @click='clear("themeNotAllowColor")'>clear</button>
			</div>
			<div class='group'>
				<label>themeborder:</label>
				<input type='number' min='0' v-model='themeBorderWidth'/>
				<select v-model='themeBorderColorStyle'>
					<option>none</option>
					<option>dotted</option>
					<option>dashed</option>
					<option>solid</option>
				</select>
				<input type='color' v-model='themeBorderColor'/>
				<button @click='clear("themeBorder")'>clear</button>
			</div> -->
		</div>
	</div>
</template>

<script>
	import calendar from './calendar.vue';

	export default {
		data() {
			return {
				value: '',
				type: 'single',
				iconUrl: '',
				theme: '#e57373',
				themePannelBg: '#ffffff',
				themeHeaderColor: '#ffffff',
				themeHeaderBg: '',
				themeHeaderYear: '',
				themeHeaderMonth: '',
				themeHeaderSep: '',
				themeLeftArrow: '',
				themeRightArrow: '',
				themeWeekColor: '',
				themeBtnConBg: '',
				themebtnConfirmColor: '#ffffff',
				themeBtnCanBg: '#ffffff',
				themebtnCancleColor: '#000000',
				themeBorderColor: '',
				themeBorderWidth: '1',
				themeSelBg: '',
				themeSelColor: '#fff',
				themeCurmonthColor: '#000000',
				themePrevMonthColor: '#aaaaaa',
				themeNextMonthColor: '#aaaaaa',
				themeNotAllowColor: '#aaaaaa',
				themeBorderColorStyle: 'solid',
			}
		},
		methods: {
			changeBorderStyle(e) {
				this.themeBorderColorStyle = e.target.innerHTML;
			},
			setIconUrl(e) {
				let file = e.target.files || e.dataTransfer.files;
				this.iconUrl = `./images/${file[0].name}`;
			},
			getTimeValue(value) {
				this.value = value;
			},
			clearIconUrl() {
				this.iconUrl = '';
			},
			clearTheme() {
				this.theme = '';
			},
			clearPannelBg() {},
			clear(type) {
				switch(type) {
					case 'theme':
						this[type] = '#e57373';
						break;
					case 'themePannelBg':
					case 'themeHeaderColor':
					case 'themebtnConfirmColor':
					case 'themeBtnCanBg':
					case 'themeSelColor':
						this[type] = '#ffffff';
						break;
					case 'themeHeaderBg':
					case 'themeHeaderYear':
					case 'themeHeaderMonth':
					case 'themeHeaderSep':
					case 'themeLeftArrow':
					case 'themeRightArrow':
					case 'themeWeekColor':
					case 'themeBtnConBg':
					case 'themeSelBg':
						this[type]='';
						break;
					case 'themebtnCancleColor':
					case 'themeCurmonthColor':
						this[type]='#000000';
						break;
					case 'themePrevMonthColor':
					case 'themeNextMonthColor':
					case 'themeNotAllowColor':
						this[type]='#aaaaaa';
						break;
					case 'themeBorder':
						this.themeBorderColor ='';
						this.themeBorderWidth = '1';
						this.themeBorderColorStyle = 'solid';
						break;
					default: 
						this[type] = '';
				}
			}

		},
		computed: {
			themeBorderR() {
				let color = this.themeBorderColor ? this.themeBorderColor : this.theme;
				return `${this.themeBorderWidth}px ${this.themeBorderColorStyle} ${color}`;
			}
		},
		components: {
			calendar
		}
	}
</script>

<style scope lang='stylus'>
	.calendar
		float left
	.select-wrapper
		margin-left 300px
	input[type='number']
		width 30px
	input,
	select
		outline none
	label
		display inline-block
		width 200px
	.group
		margin 10px 0
</style>
