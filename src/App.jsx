import './App.css';
import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import unsplash, { mapData } from './services/api';
import Search from './components/search';
import Gallery from './components/gallery';
import Pagination from './components/pagination';
import SearchPerCategory from './components/search-per-category';
import Skeleton from './components/skeleton';

class App extends Component {
  state = {
    data: [],
    query: '',
    currentPage: 1,
    totalPages: 0,
    isLoading: true
  };
  perPage = 10;
  categories = [{ value: 'cars', label: 'Autos' }, { value: "cats", label: "Gatos"}]

  handleSearch = async (query) => {
    if(!query) return
    
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
      this.setState({ isLoading: false })    
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

  async componentDidMount() {
    // TODO: pedir fotos random
    try {
      const { response } = await unsplash.photos.getRandom({
        count: 10
      });
      
      this.setState({ data: response.map((r) => mapData(r)), totalPages: 10, isLoading: false });  
    } catch (error) {
      toast.error(error.message)
    }
  }

  render() {
    const { isLoading, data, currentPage, totalPages } = this.state;

    // TODO: solucionar cantidad de páginas que se muestran en la paginación
    // TODO: almacenar en localStorage llamadas repetitivas
    // TODO: solucionar visibilidad de Modal
    // TODO: agregar buscar por categorías

    return (
      <>
        <ToastContainer />
        <main>
          <section className='block'>
            <Search onChange={this.handleSearch}>
              <SearchPerCategory items={this.categories} onSelectOption={this.handleSearch}/>
            </Search>
          </section>
          <Gallery isLoading={isLoading} images={data}>
            <Skeleton height={400} width={400} replicate={this.perPage} />
          </Gallery>
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
