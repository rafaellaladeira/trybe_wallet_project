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
    const { user, gettingCurrencies } = this.props;
    const { currencies } = gettingCurrencies;
    const { totalField } = this.state;
    console.log(currencies);
    // console.log(gettingCurrencies);
    return (
      <div>
        <header className="header">
          <p data-testid="email-field" className="top">{ user.email }</p>
          <p data-testid="total-field" className="top">{ totalField }</p>
          <p data-testid="header-currency-field" className="top">BRL</p>
        </header>
        <div>
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              type="text"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="type">
            Moeda:
            <select id="type">
              {
                currencies.map((types) => (
                  <option key={ types }>{ types }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              type="text"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              data-testid="tag-input"
              name="category"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  gettingCurrencies: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  currencies: PropTypes.func.isRequired,
  gettingCurrencies: PropTypes.instanceOf(Object).isRequired,
};
