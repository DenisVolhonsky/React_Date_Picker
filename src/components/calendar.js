import React, { Component } from 'react'
import 'react-day-picker/lib/style.css'
import './calendar.css'
import Range from './Range'
import DatePicker from './DatePicker'


export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    this.handleRange = this.handleRange.bind(this) 
    this.customRange = this.customRange.bind(this) 
  }
  getInitialState() {
    return {
      rangeDuration: false,
      custom: false,
    }
  }

  handleRange() {
    this.setState({
      rangeDuration: !this.state.rangeDuration,
    })
  }

  customRange() {
    this.setState({
      custom: !this.state.custom,
    })
  }

  render() {
    const {rangeDuration, custom} = this.state
    const onlyRange = <div className="rangeContainer"><Range/></div>
  
    return (
      <div className="container">
        <button 
          className="selectDuration" 
          onClick={this.handleRange}>
          Select Duration
        </button>
        
        {/* temporary code */}
        <button 
          className="selectDuration" 
          onClick={this.customRange}>
          Custom Range
        </button>
        {/* end temporary code */}

        {rangeDuration===true ? onlyRange : null}
        
        {custom===true ? <DatePicker/> : null}
    </div>
    )
  }
}