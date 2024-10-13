import React, { Component } from "react";
import PageItem from "./PageItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class Page extends Component {
  static defaultProps = {
    pageSize: 8,
    category: "business",
    country: "in",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    country: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category}`;
  }
  /*For every element mpped - there should an unique key. Articles is an arrray. 
             It contains map method, it is used to do iteration and display element*/

  /* componentDidMount runs after render method, render runs after conrtsurtor method*/

  func1 = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=353e46d66c284dc097804380967a5c09&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let response = await data.json();
    this.setState({
      articles: response.articles,
      totalResults: response.totalResults,
      loading: false,
    });
  };

  async componentDidMount() {
    console.log("I run after render method");
    this.func1();
  }

  handleNextClick = async () => {
    // this.setState({loading:true});
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}
    // &apiKey=353e46d66c284dc097804380967a5c09&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let response = await data.json();
    // this.setState({articles:response.articles,
    //   page:this.state.page+1,
    //   loading:false
    // });

    this.setState({
      page: this.state.page + 1,
    });
    this.func1();

    console.log("next");
  };

  handlePrevClick = async () => {
    // this.setState({loading:true});
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=353e46d66c284dc097804380967a5c09&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let response = await data.json();
    // this.setState({articles:response.articles,
    //   page:this.state.page-1,
    //   loading:false
    // });
    this.setState({
      page: this.state.page - 1,
    });
    this.func1();

    console.log("prev");
  };

  render() {
    console.log("I run after constructor");
    return (
      <>
        <div className="container my-3">
          <h2 className="mb-4 text-center">Page News</h2>
          <div className="text-center">{this.state.loading && <Spinner />}</div>

          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <PageItem
                      title={element.title != null ? element.title : ""}
                      description={
                        element.description != null ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage != null
                          ? element.urlToImage
                          : "https://serpstat.com/files/img/34/1676542462.4999.png"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              className="btn btn-sm btn-dark"
              onClick={this.handlePrevClick}
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              className="btn btn-sm btn-dark"
              onClick={this.handleNextClick}
              disabled={
                this.state.totalResults < this.state.page * this.props.pageSize
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Page;
