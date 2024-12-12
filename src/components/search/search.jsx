import { Component } from "react";
import debounce from "../../utils/debounce";
import "./search.css"

class Search extends Component {
  render() {
    const { onChange } = this.props;


    return (
      <search className="search">
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="photo">Busca una imagen</label>
          <input type="search" name="query" id="photo" placeholder="Gatos..." defaultValue={""}  onChange={debounce((e) => onChange(e.target.value))}/>
        </form>
      </search>
    )
  }
}

export default Search;