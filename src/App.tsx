import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { GlobalStyle } from "./styles/global";
import { createServer, Model } from "miragejs";
import { useState } from "react";
import Modal from 'react-modal';
import { NewTRansactionModal } from "./components/NewTransactionModal";
import { TransactionProvider, TransactionsContext } from "./TransactionsContext";

createServer({

  models: {
    transaction: Model
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {id:1,title:'Freelance de website',type:'deposit',category:'Dev',amount: 6000,createdAt: new Date('2021-02-12 09:00:00'),},
        {id:2,title:'Aluguel',type:'withdraw',category:'Casa',amount: 1100,createdAt: new Date('2021-02-14 14:00:00'),},
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
      /*return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date()
        }
      ]*/
    })

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      //return data;
      return schema.create('transaction', data)
    })
  }
});

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal(){
        setIsNewTransactionModalOpen(true)
    }
    function handleCloseNewTransactionModal(){
        setIsNewTransactionModalOpen(false)
    }
  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />

      <NewTRansactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionProvider>
  );
}
