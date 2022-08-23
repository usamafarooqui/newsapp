import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date , source } = this.props;
    return (
      <div className="my-3"> 
        <div className="card" style={{width:'18rem', height:'25rem'}} >
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <div style={{
                display:'flex',
                justifyContent:'center',
                position:'absolute',
                right:'77px',
                bottom:'380px'
              }}>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
               {source}
                
              </span>
              </div>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                {" "}
                by {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
