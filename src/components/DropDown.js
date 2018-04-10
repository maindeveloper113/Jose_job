import React, { Component } from 'react';

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "Select Language",
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleSelect(e) {
    this.setState({
      selectedValue: e.target.value,
    })

    if (this.props.handleSelect) {
      this.props.handleSelect(e.target.value);
    }
  }

  handleMouseDown() {
    this.setState({
      selectedValue: this.props.defaultLanguage,
    });
    if (this.props.handleSelect) {
      this.props.handleSelect(this.props.defaultLanguage);
    }
  }

  render() {
    return (
      <div className='l-dropdown' style={{marginTop: 50}}>
        <span className='custom-dropdown'>
          <select 
            value={this.state.selectedValue}
            onChange={this.handleSelect}
            onMouseDown={this.handleMouseDown}
          >
            <option 
              disabled
              value="Select Language"
            >
              Select Language
            </option>
            {
              this.props.languages.map((language, i) => 
                  <option value={language} key={i}>
                    {language}
                  </option>
              )
            }
          </select>
        </span>
      </div>
    );
  }
}

export default DropDown;
