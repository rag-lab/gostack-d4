import { uuid } from 'uuidv4';

interface TransactionConstructor {
  title: string;
  value: number;
  type: string;
}
class Transaction {
  id: string;

  title: string;

  value: number;

  type: string;

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
