import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalField: 0,
    };
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

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};
