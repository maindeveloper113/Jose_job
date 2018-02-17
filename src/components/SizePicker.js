import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SizePicker extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const value = parseInt(e.target.value)
    this.props.onChange(value)
  }

  render() {
    const { value, options } = this.props

    return (
      <span>
        <select className="wide news-filter" onChange={this.onChange} value={value}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    )
  }
}

SizePicker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}
