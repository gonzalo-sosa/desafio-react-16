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
  categories = [{ value: 'cars', label: 'Autos' }, { value: "cats", label: "Gatos"}, { value: "football", label: "Fútbol"}, { value: "diamond", label: "Diamantes"} ]

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
    try {
      const { response } = await unsplash.photos.getRandom({
        count: 10
      });

      if (this.state.data.length > 0) return;
      
      this.setState({ data: response.map((r) => mapData(r)), totalPages: 10, isLoading: false });  
    } catch (error) {
      toast.error(error.message)
    }
  }

  render() {
    const { isLoading, data, currentPage, totalPages } = this.state;

    // TODO: almacenar en localStorage llamadas repetitivas

    return (
      <>
        <ToastContainer />
        <main>
          <section className='block'>
            <Search onChange={this.handleSearch}>
              <SearchPerCategory label={"Categorias"} items={this.categories} onSelectOption={this.handleSearch}/>
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
          siblingCount={2}
        />
      </>
    );
  }
}

export default App;
