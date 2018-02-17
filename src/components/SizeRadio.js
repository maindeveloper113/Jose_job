import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SizeRadio extends Component {
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
    const radios = options.map((option, key) => {
      return (
        <div className="radio">
          <label>
            <input 
              type="radio" 
              value={option.toString()} 
              key={key} 
              checked={option===value} 
              onChange={this.onChange}
            />
            {option.toString()}
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

SizeRadio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}
