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
    isLoading: true,
  };
  perPage = 10;
  categories = [
    { value: 'cars', label: 'Autos' },
    { value: 'cats', label: 'Gatos' },
    { value: 'football', label: 'Fútbol' },
    { value: 'diamond', label: 'Diamantes' },
  ];

  handleSearch = async (query) => {
    if (!query) return;

    this.setState({ query });

    try {
      const { response } = await unsplash.search.getPhotos({
        query,
        page: 1,
        perPage: this.perPage,
      });

      const data = response.results.map((r) => mapData(r));
      localStorage.setItem(`query-${query}&page-1`, JSON.stringify(data));

      this.setState({ data });
      if (this.state.totalPages !== response.total_pages)
        this.setState({ totalPages: response.total_pages });
      this.setState({ isLoading: false });
    } catch (error) {
      toast.error(error.message);
    }
  };

  handleSearchWithFilter = (query) => {
    this.setState({ currentPage: 1 })
    this.handleSearch(query)
  }

  handlePageChange = async (nextPage) => {
    if (this.state.currentPage === nextPage) return;

    this.setState({ isLoading: true, currentPage: nextPage })

    let data = localStorage.getItem(`query-${this.state.query}&page-${nextPage}`);
    if (data) {
      this.setState({
        data: JSON.parse(data),
        isLoading: false
      });
      return;
    }

    this.setState({ isLoading: true })

    const { response } = await unsplash.search.getPhotos({
      query: this.state.query,
      page: nextPage,
      perPage: this.perPage,
    });

    data = response.results.map((r) => mapData(r));

    localStorage.setItem(`query-${this.state.query}&page-${nextPage}`, JSON.stringify(data));

    this.setState({
      data,
      currentPage: nextPage,
      isLoading: false
    });
  };

  async componentDidMount() {
    try {
      const { response } = await unsplash.photos.getRandom({
        count: 10,
      });

      if (this.state.data.length > 0) return;

      this.setState({
        data: response.map((r) => mapData(r)),
        totalPages: 10,
        isLoading: false,
      });
    } catch (error) {
      toast.error("Error al cargar las imágenes 😥, " + error.message + ".");
      // TODO: renderizar mensaje de error o mostrar imágenes rotas
    }
  }

  render() {
    const { isLoading, data, currentPage, totalPages } = this.state;

    return (
      <>
        <ToastContainer />
        <h1 style={{ textAlign: 'center' }}>Galería de imágenes</h1>
        <main>
          <section>
            <Search onChange={this.handleSearch}>
              <SearchPerCategory
                label={'Categorias'}
                items={this.categories}
                onSelectOption={this.handleSearchWithFilter}
              />
            </Search>
          </section>
          <Gallery isLoading={isLoading} images={data}>
            <Skeleton height={400} width={400} replicate={this.perPage} />
          </Gallery>
          <Pagination
            totalCount={totalPages}
            pageSize={this.perPage}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            siblingCount={2}
          />
        </main>
      </>
    );
  }
}

export default App;
