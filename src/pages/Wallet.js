import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, allCurrencies } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
    };
  }

  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleButton =(e) => {
    e.preventDefault();
    const { allCurrency } = this.props;

    allCurrency(this.state);

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
    }));

    this.handleSum();
  }

    handleSum = () => {
      const { gettingExpenses } = this.props;
      const sum = gettingExpenses.reduce((acc, cur) => {
        const { value, currency, exchangeRates } = cur;
        const gettingValue = exchangeRates[currency].ask;
        return acc + (gettingValue * value);
      }, 0);

      return sum.toFixed(2);
    }

    render() {
      const { user, gettingCurrencies } = this.props;
      const { currencies } = gettingCurrencies;
      const { value, description } = this.state;

      return (
        <div>
          <header className="header">
            <p data-testid="email-field" className="top">{ user.email }</p>
            <p data-testid="total-field" className="top">{ this.handleSum() }</p>
            <p data-testid="header-currency-field" className="top">BRL</p>
          </header>
          <div className="inputs">
            <label htmlFor="value">
              Valor:
              <input
                id="value"
                name="value"
                value={ value }
                data-testid="value-input"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="type">
              Moeda:
              <select
                id="type"
                name="currency"
                onChange={ this.handleChange }
              >
                {
                  currencies.map((types) => (
                    <option
                      key={ types }
                      value={ types }
                      id={ types }
                    >
                      { types }
                    </option>
                  ))
                }
              </select>
            </label>
            <label htmlFor="description">
              Descrição:
              <input
                onChange={ this.handleChange }
                name="description"
                value={ description }
                type="text"
                data-testid="description-input"
              />
            </label>
            <label htmlFor="method">
              Método de pagamento:
              <select
                onChange={ this.handleChange }
                name="method"
                id="method"
                data-testid="method-input"
              >
                <option value="" disabled selected> </option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="category">
              Categoria:
              <select
                data-testid="tag-input"
                name="tag"
                id="category"
                onChange={ this.handleChange }
              >
                <option value="" disabled selected> </option>
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporteo">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
            <button
              className="button"
              type="button"
              onClick={ this.handleButton }
            >
              Adicionar despesa
            </button>
          </div>
          <Table />
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  user: state.user,
  gettingCurrencies: state.wallet,
  gettingExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchAPI()),
  allCurrency: (state) => dispatch(allCurrencies(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  currencies: PropTypes.func.isRequired,
  gettingCurrencies: PropTypes.instanceOf(Object).isRequired,
  gettingExpenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  allCurrency: PropTypes.func.isRequired,
};
