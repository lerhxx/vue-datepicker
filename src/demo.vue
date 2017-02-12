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
			type='range'
			v-on:getValue='getTimeValue'
		></calendar>
		<div class='select-wrapper'>
			<div class='group'>
				<label>getValue:</label>
				<span>{{value}}</span>
			</div>
			<div class='group'>
				<label>iconUrl:</label>
				<input type='file' @change='setIconUrl'/>
			</div>
			<div class='group'>
				<label>theme:</label>
				<input type='color' v-model='theme'/>
			</div>
			<div class='group'>
				<label>themepannelbg:</label>
				<input type='color' v-model='themePannelBg'/>
			</div>
			<div class='group'>
				<label>themeheadercolor:</label>
				<input type='color' v-model='themeHeaderColor'/>
			</div>
			<div class='group'>
				<label>themeheaderbg:</label>
				<input type='color' v-model='themeHeaderBg'/>
			</div>
			<div class='group'>
				<label>themeheaderyear:</label>
				<input type='color' v-model='themeHeaderYear'/>
			</div>
			<div class='group'>
				<label>themeheadermonth:</label>
				<input type='color' v-model='themeHeaderMonth'/>
			</div>
			<div class='group'>
				<label>themeheadersep:</label>
				<input type='color' v-model='themeHeaderSep'/>
			</div>
			<div class='group'>
				<label>themeleftarrow:</label>
				<input type='color' v-model='themeLeftArrow'/>
			</div>
			<div class='group'>
				<label>themerightarrow:</label>
				<input type='color' v-model='themeRightArrow'/>
			</div>
			<div class='group'>
				<label>themeweekcolor:</label>
				<input type='color' v-model='themeWeekColor'/>
			</div>
			<div class='group'>
				<label>themebtnconbg:</label>
				<input type='color' v-model='themeBtnConBg'/>
			</div>
			<div class='group'>
				<label>themebtnconfirmcolor:</label>
				<input type='color' v-model='themebtnConfirmColor'/>
			</div>
			<div class='group'>
				<label>themebtncanbg:</label>
				<input type='color' v-model='themeBtnCanBg'/>
			</div>
			<div class='group'>
				<label>themebtncanclecolor:</label>
				<input type='color' v-model='themebtnCancleColor'/>
			</div>
			<div class='group'>
				<label>themeselbg:</label>
				<input type='color' v-model='themeSelBg'/>
			</div>
			<div class='group'>
				<label>themeselcolor:</label>
				<input type='color' v-model='themeSelColor'/>
			</div>
			<div class='group'>
				<label>themecurmonthcolor:</label>
				<input type='color' v-model='themeCurmonthColor'/>
			</div>
			<div class='group'>
				<label>themeprevmonthcolor:</label>
				<input type='color' v-model='themePrevMonthColor'/>
			</div>
			<div class='group'>
				<label>themenextmonthcolor:</label>
				<input type='color' v-model='themeNextMonthColor'/>
			</div>
			<div class='group'>
				<label>themenotallowcolor:</label>
				<input type='color' v-model='themeNotAllowColor'/>
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
			</div>
		</div>
	</div>
</template>

<script>
	import calendar from './calendar.vue';

	export default {
		data() {
			return {
				value: '',
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
				console.log(this.value);
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
