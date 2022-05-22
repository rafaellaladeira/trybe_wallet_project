import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <table className="table">
        <thead className="head">
          <tr>
            <th className="td">Descrição</th>
            <th className="td">Tag</th>
            <th className="td">Método de pagamento</th>
            <th className="td">Valor</th>
            <th className="td">Moeda</th>
            <th className="td">Câmbio utilizado</th>
            <th className="td">Valor convertido</th>
            <th className="td">Moeda de conversão</th>
            <th className="td">Editar/Excluir</th>
          </tr>
        </thead>

        <tbody className="body">
          {
            expenses.map((expense) => {
              const { exchangeRates, currency, value } = expense;
              const valueDecimals = Number(value).toFixed(2);
              const getAsk = exchangeRates[currency].ask;
              const getAskToRender = Number(exchangeRates[currency].ask).toFixed(2);
              const exchange = exchangeRates[currency].name;
              const conversionCurrency = (value * getAsk).toFixed(2);

              return (
                <tr key={ expense.id }>
                  <td className="td">{ expense.description }</td>
                  <td className="td">{ expense.tag }</td>
                  <td className="td">{ expense.method }</td>
                  <td className="td">{ valueDecimals }</td>
                  <td className="td">{ exchange }</td>
                  <td className="td">{ getAskToRender }</td>
                  <td className="td">{ conversionCurrency }</td>
                  <td className="td">Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};
