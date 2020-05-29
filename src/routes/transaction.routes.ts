import { Router, response } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    const resposta = { transactions, balance };
    return response.json(resposta);
    // return response.json(transactionsRepository.getBalance());
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body;

    // so faz retirada se tiver saldo
    if (type === 'outcome') {
      const { total } = transactionsRepository.getBalance();

      if (total - value < 0)
        return response.status(400).json({ error: 'No funds :(' });
    }

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = createTransaction.execute({ title, value, type });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
