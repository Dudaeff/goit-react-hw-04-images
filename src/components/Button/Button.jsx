import PropTypes from 'prop-types';

import { LoadMoreBtn } from './LoadMoreBtn.styled';

const Button = ({ type, onClick, children }) => {
    return (<LoadMoreBtn type={type}  onClick={onClick} >{children}</LoadMoreBtn>);
};

export { Button };

Button.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};