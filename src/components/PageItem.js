import React, { Component } from 'react'

export class PageItem extends Component {
  
  render() {
    let {title, description, imageUrl, newsUrl, author, publishedAt} = this.props;
    return (
      <div>
        <div className="col-md-4 mb-3">
            <div className="card" style={{"width": "18rem"}}>
                <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p class="card-text"><small class="text-muted">Created by {author} on {publishedAt}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read News</a>
                </div>
            </div>
        </div>
      </div>
    ) 
  }
}

export default PageItem
