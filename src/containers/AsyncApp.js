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

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleSelectedSizeChange = this.handleSelectedSizeChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedContent, selectedSize } = this.props
    dispatch(fetchPostsIfNeeded(selectedContent, selectedSize))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedContent !== prevProps.selectedContent) {
      const { dispatch, selectedContent, selectedSize } = this.props
      dispatch(fetchPostsIfNeeded(selectedContent, selectedSize))
    }
  }

  handleChange(nextContent) {
    const { selectedSize } = this.props
    this.props.dispatch(selectContent(nextContent))
    this.props.dispatch(fetchPostsIfNeeded(nextContent, selectedSize))
  }

  handleChange1(e) {
    const nextContent = e.value;
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

  render() {
    const { selectedContent, selectedSize, posts, isFetching, lastUpdated } = this.props
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
                <a className="clear" href="#">Clear</a>
              </span>
              <div>
                <Dropdown
                  value={selectedContent}
                  onChange={this.handleChange1.bind(this)}
                  options={['design', 'bitcoin']}
                />
                <Picker
                  value={selectedContent}
                  onChange={this.handleChange}
                  options={['design', 'bitcoin']}
                />
              </div>
              <div>
                <SizePicker
                  value={selectedSize}
                  onChange={this.handleSelectedSizeChange}
                  options={[5, 10, 15, 20]}
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
                <a className="clear" href="#">Clear</a>
              </span>
              <div>
                <Radio
                  value={selectedContent}
                  onChange={this.handleChange}
                  options={['design', 'bitcoin']}
                />
              </div>
              <br/>
              <div>
                <SizeRadio
                  value={selectedSize}
                  onChange={this.handleSelectedSizeChange}
                  options={[5, 10, 15, 20]}
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
