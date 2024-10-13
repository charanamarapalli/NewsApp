import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Page from "./components/Page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY;
  componentDidMount() {
    console.log('API Key:', process.env.REACT_APP_API_KEY); // Log the API key for debugging
  }
  
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Page apiKey={this.apiKey} pageSize={20} category=" " country="us" />}
            />
          </Routes>

          <Routes>
            <Route
              path="/general"
              element={<Page apiKey={this.apiKey} pageSize={20} category="general" country="us" />}
            />
          </Routes>

          <Routes>
            <Route
              path="/business"
              element={<Page apikey={this.apiKey} pageSize={20} category="business" country="us" />}
            />
          </Routes>

          <Routes>
            <Route
              path="/entertainment"
              element={
                <Page apikey={this.apiKey} pageSize={20} category="entertainment" country="us" />
              }
            />
          </Routes>

          <Routes>
            <Route
              path="/health"
              element={<Page apikey={this.apiKey} pageSize={20} category="health" country="us" />}
            />
          </Routes>

          <Routes>
            <Route
              path="/science"
              element={<Page apikey={this.apiKey} pageSize={20} category="science" country="us" />}
            />
          </Routes>

          <Routes>
            <Route
              path="/sports"
              element={<Page apikey={this.apiKey} pageSize={20} category="sports" country="us" />}
            />
          </Routes>

          <Routes>
            <Route
              path="/technology"
              element={
                <Page apikey={this.apiKey} pageSize={20} category="technology" country="us" />
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
