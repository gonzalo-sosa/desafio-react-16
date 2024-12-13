import './App.css';
import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import unsplash, { mapData } from './services/api';
import Search from './components/search';
import Gallery from './components/gallery';
import Pagination from './components/pagination';
import SearchPerCategory from './components/search-per-category';

class App extends Component {
  state = {
    data: [],
    query: '',
    currentPage: 1,
    totalPages: 0,
  };
  perPage = 10;
  categories = [{ value: 'cars', label: 'Autos' }, { value: "cats", label: "Gatos"}]

  handleSearch = async (query) => {
    this.setState({ query });

    try {
      const { response } = await unsplash.search.getPhotos({
        query,
        page: 1,
        perPage: this.perPage,
      });

      this.setState({ data: response.results.map((r) => mapData(r)) });
      if (this.state.totalPages !== response.total_pages)
        this.setState({ totalPages: response.total_pages });
    } catch (error) {
      toast.error(error.message)
    }
  };

  handlePageChange = async (page) => {
    if (this.state.currentPage === page) return;

    const nextPage = page;

    const { response } = await unsplash.search.getPhotos({
      query: this.state.query,
      page: nextPage,
      perPage: this.perPage,
    });

    this.setState({
      data: response.results.map((r) => mapData(r)),
      currentPage: nextPage,
    });
  };

  render() {
    const { data, currentPage, totalPages } = this.state;

    // TODO: solucionar cantidad de páginas que se muestran en la paginación
    // TODO: almacenar en localStorage llamadas repetitivas
    // TODO: solucionar visibilidad de Modal
    // TODO: agregar buscar por categorías

    return (
      <>
        <ToastContainer />
        <main>
          <section className='block'>
            <Search onChange={this.handleSearch} />
            <SearchPerCategory items={this.categories} onSelectOption={this.handleSearch}/>
          </section>
          <Gallery images={data} />
        </main>
        <Pagination
          totalCount={totalPages}
          pageSize={this.perPage}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default App;
