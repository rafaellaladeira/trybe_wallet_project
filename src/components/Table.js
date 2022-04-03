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
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody className="body">
          {
            expenses.map((expense) => {
              const { exchangeRates, currency, value } = expense;
              const valueDecimals = (value * 1).toFixed(2);
              const getAsk = exchangeRates[currency].ask;
              const getAskToRender = (exchangeRates[currency].ask * 1).toFixed(2);
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
