import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO

    const { income, outcome } = this.transactions.reduce(
      (acumulator: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          // eslint-disable-next-line no-param-reassign
          acumulator.income += transaction.value;
        } else if (transaction.type === 'outcome') {
          // eslint-disable-next-line no-param-reassign
          acumulator.outcome += transaction.value;
        }

        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {

    // TODO
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
