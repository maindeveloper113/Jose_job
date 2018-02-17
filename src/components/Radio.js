import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Radio extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    const { value, options } = this.props
    const radios = options.map((option, key) => {
      return (
        <div className="radio">
          <label>
            <input 
              type="radio" 
              value={option} 
              key={key} 
              checked={option===value} 
              onChange={this.onChange}
            />
            {option}
          </label>
        </div>
      )
    })
    return (
      <form>
        {radios}
      </form>
    )
  }
}

Radio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}
