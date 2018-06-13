import React from 'react';
import './calendar.css'

const Range = () => {
  const range = [
    "Live",
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range"
  ]
  return (
    <div className="ranges">
      <ul>
        {range.map((item, idx) => idx === 0 ? <li key={idx} data-range-key={`${item}`} className="active">{`${item}`}</li>
        :
        <li key={idx} data-range-key={`${item}`}>{`${item}`}</li>
        )}
      </ul>
    </div>
  )
}

export default Range