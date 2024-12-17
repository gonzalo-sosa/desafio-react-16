/* eslint-disable no-unused-vars */
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
    error: null,
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

    // TODO: limpieza de query

    this.setState({ query, isLoading: true, currentPage: 1 });

    try {
      const { response } = await unsplash.search.getPhotos({
        query,
        page: 1,
        perPage: this.perPage,
      });

      localStorage.setItem(`query-${query}&page-1`, JSON.stringify(response));

      const data = response.results.map((r) => mapData(r));

      this.setState({ data });
      if (this.state.totalPages !== response.total_pages)
        this.setState({ totalPages: response.total_pages });
      this.setState({ isLoading: false, error: null });
    } catch (error) {
      toast.error('Error al solicitar las imágenes.');
      this.setState({ error: { message: 'Error al solicitar las imágenes.' } });
    }
  };

  handleSearchWithFilter = (query) => {
    this.setState({ currentPage: 1 });
    this.handleSearch(query);
  };

  handlePageChange = async (nextPage) => {
    if (this.state.currentPage === nextPage) return;

    this.setState({ isLoading: true, currentPage: nextPage });

    let value = localStorage.getItem(
      `query-${this.state.query}&page-${nextPage}`,
    );
    if (value) {
      const { results, total_pages } = JSON.parse(value);

      this.setState({
        data: results.map((r) => mapData(r)),
        isLoading: false,
        error: null,
        totalPages: total_pages,
      });
      return;
    }

    try {
      const { response } = await unsplash.search.getPhotos({
        query: this.state.query,
        page: nextPage,
        perPage: this.perPage,
      });

      localStorage.setItem(
        `query-${this.state.query}&page-${nextPage}`,
        JSON.stringify(response),
      );

      const data = response.results.map((r) => mapData(r));

      this.setState({
        data,
        isLoading: false,
        totalPages: response.total_pages,
        error: null,
      });
    } catch (error) {
      toast.error('Error al solicitar más imágenes.');
      this.setState({ error: { message: 'Error al solicitar más imágenes.' } });
    }
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
        error: null,
      });
    } catch (error) {
      toast.error('Error al cargar las imágenes 😥.');
      this.setState({
        error: {
          message:
            'Error al cargar las imágenes, intente nuevamente más tarde.',
        },
      });
    }
  }

  render() {
    const { isLoading, data, currentPage, totalPages, error } = this.state;

    return (
      <>
        <ToastContainer />
        <main>
          <section className="block">
            <Search onChange={this.handleSearch}>
              <SearchPerCategory
                label={'Categorias'}
                items={this.categories}
                onSelectOption={this.handleSearchWithFilter}
              />
            </Search>
          </section>
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <div>{error.message}</div>
            </div>
          )}
          {!error && (
            <>
              <Gallery isLoading={isLoading} images={data}>
                <Skeleton height={400} width={400} replicate={this.perPage} />
              </Gallery>
              <div className="mt-2 d-flex justify-content-center">
                <Pagination
                  totalCount={totalPages}
                  pageSize={this.perPage}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </>
          )}
        </main>
      </>
    );
  }
}

export default App;
