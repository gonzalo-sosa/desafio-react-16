import { Component } from 'react';
import debounce from '../utils/debounce';

class Search extends Component {
  render() {
    const { onChange } = this.props;

    return (
      <search className="search">
        <form className="search__form" onSubmit={(e) => e.preventDefault()}>
          <img
            id="searchicon"
            width="22"
            height="22"
            src="https://img.icons8.com/sf-black/100/ffffff/search.png"
            alt="search"
          />
          <input
            type="search"
            name="query"
            id="photo"
            placeholder="Gatos..."
            defaultValue={''}
            onChange={debounce((e) => onChange(e.target.value))}
          />
        </form>
        {this.props.children}
      </search>
    );
  }
}

export default Search;
