import PropTypes from 'prop-types';

const API_KEY = '32804651-81b33072ba9641590fc1a4880';
const BASE_URL = 'https://pixabay.com/api/';

const getImagesByQuery = async (searchQuery, page) => {
  const URL = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(URL);
};

export { getImagesByQuery };

getImagesByQuery.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
};
