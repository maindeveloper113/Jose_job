import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectContent,
  fetchPostsIfNeeded,
  invalidateContent,
  selectSize
} from '../actions'
import Dropdown from 'react-dropdown'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import SizePicker from '../components/SizePicker'
import Radio from '../components/Radio'
import SizeRadio  from '../components/SizeRadio'

const defaultOptions = [5, 10, 15, 20]

const contentOptionsObject = [
  {
    value: 'design',
    label: 'Best Design'
  },
  {
    value: 'bitcoin',
    label: 'About Bitcoin'
  }
]

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleSelectedSizeChange = this.handleSelectedSizeChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.initParameters = this.initParameters.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedContent, selectedSize } = this.props
    dispatch(fetchPostsIfNeeded(selectedContent, selectedSize))

    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedContent !== prevProps.selectedContent) {
      const { dispatch, selectedContent, selectedSize } = this.props
      dispatch(fetchPostsIfNeeded(selectedContent, selectedSize))
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    var winHeight = window.innerHeight;
    var body = document.body;
    var html = document.documentElement;
    var docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight );
    var positionY = window.scrollY;
    if (winHeight + positionY === docHeight) {
      this.handleSelectedSizeChange(this.props.selectedSize + 5)
    }
  }

  handleChange(label) {
    const nextContent = contentOptionsObject.find((item) => item.label === label).value
    const { selectedSize } = this.props
    this.props.dispatch(selectContent(nextContent))
    this.props.dispatch(fetchPostsIfNeeded(nextContent, selectedSize))
  }

  handleChange1(e) {
    const nextContent = contentOptionsObject.find((item) => item.label === e.value).value
    const { selectedSize } = this.props
    this.props.dispatch(selectContent(nextContent))
    this.props.dispatch(fetchPostsIfNeeded(nextContent, selectedSize))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedContent, selectedSize } = this.props
    dispatch(invalidateContent(selectedContent))
    dispatch(fetchPostsIfNeeded(selectedContent, selectedSize))
  }

  handleSelectedSizeChange(nextSelectedSize) {
    const { selectedContent } = this.props
    this.props.dispatch(selectSize(nextSelectedSize))
    this.props.dispatch(fetchPostsIfNeeded(selectedContent, nextSelectedSize))
  }

  initParameters() {
    const selectedContent = 'design'
    const selectedSize = 5
    this.props.dispatch(selectSize(selectedSize))
    this.props.dispatch(selectContent(selectedContent))
    this.props.dispatch(fetchPostsIfNeeded(selectedContent, selectedSize))
  }

  render() {
    const { selectedContent, selectedSize, posts, isFetching, lastUpdated } = this.props
    let options = defaultOptions.slice();
    if (defaultOptions.indexOf(selectedSize) === -1) {
      options.push(selectedSize)
    }

    const selectedContentLabel = contentOptionsObject.find((item) => item.value === selectedContent).label

    const contentOptions = []
    contentOptionsObject.map((item) => {
      contentOptions.push(item.label)
    })

    return (
      <div>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {
          posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }

        <div className="right-rail-wrapper">
          <div className="filters">
            <div className="filters-wrapper">
              <span className="heading">
                <span>Filters</span>
                <a className="clear" onClick={this.initParameters}>Clear</a>
              </span>
              <div>
                <Dropdown
                  value={selectedContentLabel}
                  onChange={this.handleChange1.bind(this)}
                  options={contentOptions}
                />
                <Picker
                  value={selectedContentLabel}
                  onChange={this.handleChange}
                  options={contentOptions}
                />
              </div>
              <div>
                <SizePicker
                  value={selectedSize}
                  onChange={this.handleSelectedSizeChange}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="right-rail-wrapper">
          <div className="filters">
            <div className="filters-wrapper">
              <span className="heading">
                <span>Radio</span>
                <a className="clear" onClick={this.initParameters}>Clear</a>
              </span>
              <div>
                <Radio
                  value={selectedContentLabel}
                  onChange={this.handleChange}
                  options={contentOptions}
                />
              </div>
              <br/>
              <div>
                <SizeRadio
                  value={selectedSize}
                  onChange={this.handleSelectedSizeChange}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedContent: PropTypes.string.isRequired,
  selectedSize: PropTypes.number.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedContent, postsByContent, selectedSize } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByContent[selectedContent] || {
      isFetching: true,
      items: []
    }

  return {
    selectedContent,
    selectedSize,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
