import React, { Component } from "react";
import PageItem from "./PageItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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
    apiKey: PropTypes.string.isRequired, // Add this line to enforce the apiKey prop
  };

  constructor(props) {
    super(props);
    console.log('Received API Key:', this.props.apiKey); // Check if the apiKey is received correctly

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
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
    this.setState({
      page: this.state.page + 1,
    });
    this.func1();
  }

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.func1();

    console.log("next");
  };

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.func1();

    console.log("prev");
  };

  fetchMoreData = async ()=>{
    this.setState({
      page: this.state.page + 1
    });
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let response = await data.json();
    this.setState({
      articles: this.state.articles.concat(response.articles),
      totalResults: response.totalResults,
      loading: false,
    });
  }

  render() {
    console.log("I run after constructor");
    return (
      <>
        
          <h2 className="mb-4 text-center">Page News</h2>
          <div className="text-center">{this.state.loading && <Spinner />}</div>

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.totalResults!==this.state.articles.length}
            loader={<Spinner />}
          >
            <div className="container">

            <div className="row">
              { this.state.articles.map((element) => {
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
            </div>
          </InfiniteScroll>
       
      </>
    );
  }
}

export default Page;
