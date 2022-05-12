import React from "react";
import "../Search.css";
import axios from "axios"; //it fetches data in json format
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      query: "", //TO store the user query
      results: {}, //TO store the results of the query
      loading: false, //To show the data is loading
      message: "", //Store any error message
    };
    this.cancel = "";
  }

  fetchSearchResults = (query) => {
    //updated pagNo for pagination
    //const pageNumber = 41;
    //const url = `https://pixabay.com/api/?key=27092558-258429607277533ad0a392079&q=${query}`;
    const url = "http://localhost:5000/search";
    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source(); //TO cancel the previous search

    const request = {
      // body: { query: this.state.query },
      query: this.state.query,
    };
    axios
      .post(url, request)
      .then((res) => {
        console.log("response : " + res.data);
        console.log(this.state.value);
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to fetch the data. Please check network",
          });
        }
      });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  handleClick = () => {
    const query = this.state.value;
    this.setState({ query: query, loading: true, message: "" }, () => {
      this.fetchSearchResults(query); //TO call the function
    }); //loading:true and message empty: So When typed it moves away
  };
  render() {
    return (
      <div className="container">
        <h2 className="heading"> Stackflow Search Demo</h2>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            id="search-input"
            placeholder="search"
            onChange={this.handleChange}
          />
          <i
            className="fa fa-search search-icon"
            aria-hidden="true"
            onClick={this.handleClick}
          />
        </label>
      </div>
    );
  }
}
export default Search;
