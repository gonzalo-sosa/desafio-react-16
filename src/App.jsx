import './App.css'
import { Component } from 'react'
import unsplash, { mapData } from './services/api'
import { Search, SearchWithFilter } from './components/search'
import { Gallery } from './components/gallery'
import { Pagination } from './components/pagination'

class App extends Component {
  state = {
    data: [],
    query: "",
    currentPage: 1,
    totalPages: 0
  }
  perPage = 10;

  handleSearch = async (query) => {
    this.setState({ query })

    const { response } = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: this.perPage,
    })

    this.setState({ data: response.results.map(r => mapData(r)) })
    if(this.state.totalPages !== response.total_pages)
      this.setState({ totalPages: response.total_pages });
  }

  handlePageChange = async (page) => {
    if (this.state.currentPage === page) return
    
    const nextPage = page;
    
    const { response } = await unsplash.search.getPhotos({
      query: this.state.query,
      page: nextPage,
      perPage: this.perPage
    })

    this.setState({ data: response.results.map(r => mapData(r)), currentPage: nextPage })
  }
  
  render() {
    const { data, currentPage, totalPages } = this.state
    
    // TODO: solucionar cantidad de páginas que se muestran en la paginación

    return <>
      <main>
        <Search onChange={this.handleSearch} />
        <SearchWithFilter items={[{ value:"autos", label:"Autos" }]} />
        <Gallery images={data} />
      </main>
      <Pagination
        itemsCount={totalPages}
        pageSize={this.perPage}
        currentPage={currentPage}
        onPageChange={this.handlePageChange} 
      />
    </> 
  }
}

export default App
