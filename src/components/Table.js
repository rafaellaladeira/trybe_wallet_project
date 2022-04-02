import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    // const { tag, method, value, currency, description } = expenses;
    // console.log(tag);
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
              const getAsk = exchangeRates[currency].ask;
              const convert = exchangeRates[currency].name;
              const mult = value * getAsk;

              return (
                <tr key={ expense.id }>
                  <td className="td">{ expense.description }</td>
                  <td className="td">{ expense.tag }</td>
                  <td className="td">{ expense.method }</td>
                  <td className="td">{ expense.value }</td>
                  <td className="td">{ convert}</td>
                  <td className="td">{ getAsk }</td>
                  <td className="td">
                    R$
                    {' '}
                    { mult }
                  </td>
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
