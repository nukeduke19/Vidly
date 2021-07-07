import _ from "lodash";
import React, { Component } from "react";
import { paginate } from "./../../utils/paginate";
import MoviesTable from "../MoviesTable";
import ListGroup from "./ListGroup";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import SearchBox from "../SearchBox";
import { getGenres } from "../../services/genreService";
import { getMovies, deleteMovie } from "../../services/movieService";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: null,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }

  getPageData = () => {
    const {
      movies: allMovies,
      selectedGenre,
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This Movie Has Already been Deleted ");
      }

      this.setState({ movies: originalMovies });
    }
  };

  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };
  handleSearch = (query) => {
    this.setState({ selectedGenre: null, currentPage: 1, searchQuery: query });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database</p>;
    const { currentPage, pageSize, sortColumn, searchQuery } = this.state;
    const { totalCount, data: movies } = this.getPageData();
    const { user } = this.props;

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the databse</p>
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary btn-sm"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLiked}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
