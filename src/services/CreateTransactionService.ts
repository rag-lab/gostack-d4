import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {

    // TODO
    if (type === 'income' || type === 'outcome') {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transaction;
    }
    throw Error('Invalid Type parameter');
  }
}

export default CreateTransactionService;
