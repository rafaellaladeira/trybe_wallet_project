import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalField: 0,
    };
  }

  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  render() {
    const { user } = this.props;
    const { totalField } = this.state;
    return (
      <header className="header">
        <p data-testid="email-field" className="top">{ user.email }</p>
        <p data-testid="total-field" className="top">{ totalField }</p>
        <p data-testid="header-currency-field" className="top">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  currencies: PropTypes.func.isRequired,
};
