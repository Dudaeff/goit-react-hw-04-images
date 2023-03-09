import { Component } from "react";

import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Layout } from "./Layout/Layout";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = {
    searchValue: '',
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements[1].value;
    this.setState({
      searchValue
    })
  };

  render() {
    const { searchValue } = this.state;
    return (
      <Layout>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery query={searchValue} selectImage={this.handleImageClick} />
      </Layout>
    )
  };
};
