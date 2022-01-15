import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

/**
 * 3 formas de criar um novo tipo
 * 1- repetir tudo de Transaction, tirando o id e o createdAt
 * 2- criar tipo usando o Omit
 * 3- criar usando o Pick, ai você escolhe quais propriedades você quer
 */
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
//type TransactionInput2 = Pick<Transaction, 'title' | 'amount' | 'category' | 'type'>;

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionProvider({children}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect( () => {
        api.get('/transactions')
        .then( response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
      const response = await api.post("/transactions", {
        ...transactionInput,
        createdAt: new Date()
      });
      console.log(response)
      const { transaction } = response.data;
      
      setTransactions([
        ...transactions,
        transaction,
      ]);
    }

    return (
      <TransactionsContext.Provider value={{ transactions, createTransaction}}>
        {children}
      </TransactionsContext.Provider>
    )
}