import React, { Component } from 'react'
import 'react-day-picker/lib/style.css'
import './calendar.css'
import Range from './Range'
import DatePicker from './DatePicker'
import {unix} from './TimeDecorator'


export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    this.handleRange = this.handleRange.bind(this) 
    this.addRange = this.addRange.bind(this)
    this.obj = {
      startDate : Math.floor(Date.now()/1000),
      endDate : Math.floor(Date.now()/1000),
    }
  }
  getInitialState() {
    return {
      rangeDuration: false,
      addCustomRange: false,
    }
  }

  handleRange() {
    this.setState({
      rangeDuration: !this.state.rangeDuration,
    })
  }
  
  addRange(item) {
    const live = new Date()
    const weekDay = live.getDay()
    const Year = live.getFullYear()
    const Month = live.getMonth()
    const Day = live.getDate()
    const endTime = [23, 59, 59]

    const todayStart = new Date(Year, Month, Day)
    const todayEnd = new Date(Year, Month, Day, ...endTime)
    const yesterdayStart = new Date(Year, Month, Day-1)
    const yesterdayEnd = new Date(Year, Month, Day-1, ...endTime)
    const thisWeekStart = new Date(Year, Month, Day-(weekDay-1))
    const thisWeekEnd = new Date(Year, Month, Day+(7-weekDay), ...endTime)
    const lastWeekStart = new Date(Year, Month, Day-(weekDay+6))
    const lastWeekEnd = new Date(Year, Month, Day-weekDay, ...endTime)
    const last30DaysStart = new Date(Year, Month, Day-30)
    const last30DaysEnd = new Date(Year, Month, Day, ...endTime)
    const thisMonthStart = new Date(Year, Month)
    const thisMonthEnd = new Date(Year, Month+1, 0, ...endTime)
    const lastMonthStart = new Date(Year, Month-1)
    const lastMonthEnd = new Date(Year, Month, 0, ...endTime)
  
    const newDateObj = (start, end) => {
      this.obj.startDate = unix(start)
      this.obj.endDate = unix(end) 
      return this.obj
    }

    const nowDateObj = () => {
      const now = Math.floor(Date.now()/1000)
      this.obj.startDate = now
      this.obj.endDate = now
      return this.obj
    }


     switch (item) {
      case 'Custom Range': 
        this.setState({
          rangeDuration: !this.state.rangeDuration,
          addCustomRange: !this.state.addCustomRange,
        })
      break  
      case 'Live': nowDateObj()
      break
      case 'Today': newDateObj(todayStart,todayEnd)
      break
      case 'Yesterday':  newDateObj(yesterdayStart, yesterdayEnd)
      break
      case 'This Week': newDateObj(thisWeekStart, thisWeekEnd)
      break
      case 'Last Week': newDateObj(lastWeekStart, lastWeekEnd)
      break
      case 'Last 30 Days': newDateObj(last30DaysStart, last30DaysEnd)
      break
      case 'This Month': newDateObj(thisMonthStart, thisMonthEnd)
      break
      case 'Last Month': newDateObj(lastMonthStart, lastMonthEnd)
      break
      default: 
        console.log('Range error!')                  
    }
  }

  getCustomeDate = (from, to) => {
    if (from !== null && to !== null) {
     let dayFrom = unix(from)-(12*60*60)
     let dayTo = unix(to)+((12*60*60)-1)
     this.obj.startDate = dayFrom
     this.obj.endDate = dayTo
     return this.obj
    }
    return
  }

  componentWillMount() {
    return this.obj // default time loader
  }

  render() {
    const {rangeDuration, addCustomRange} = this.state
    const defaultRange = rangeDuration && !addCustomRange
    const customRange = !rangeDuration && addCustomRange

    return (
      <div className="container">
        <button 
          className="selectDuration" 
          onClick={this.handleRange}>
          Select Duration
        </button>
        {
          defaultRange
          ? <div className="rangeContainer"><Range onTodoClick={this.addRange}/></div>
          : customRange && <DatePicker onTodoClick={this.addRange} onSelectDate={this.getCustomeDate}/>
        }
      </div>
    )
  }
}