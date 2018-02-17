import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Posts extends Component {
  render() {
    return (
      <div className="articles-wrapper">
        {this.props.posts.map((post, i) =>
          // let articleImage = {
          //   backgroundImage: `url({post.thumbnail})`
          // };
          <div key={i} className="article-item">
           <a style={{backgroundImage: 'url('+post.urlToImage +')'}} className="img-wrapper" href={post.url}></a>
           <div className="article-details">
            <a href={post.url}>
              <h3 className="title">{post.title}</h3>
            </a>
            <p className="description">{post.description}</p>
            <a href={post.url}>Read More</a>
           </div>
          </div>
        )}
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
