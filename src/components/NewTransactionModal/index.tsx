import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useState } from 'react';


interface NewTRansactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}
export function NewTRansactionModal({ isOpen, onRequestClose}: NewTRansactionModalProps) {
    const [type, setType ] = useState('deposit');

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
          <button 
            type='button' 
            onClick={onRequestClose} 
            className='react-modal-close'
          >
              <img src={closeImg} alt="Fechar o modal" />
          </button>
          <Container>
            <h1>Cadastror Transação</h1>
            <input type="text" placeholder='Título' />
            <input type="number" placeholder='Valor' />

            <TransactionTypeContainer>
                <RadioBox
                    type='button'
                    onClick={ () => {setType('deposit')} }
                    isActive={type === 'deposit'}
                    activeColor={'green'}
                >
                    <img src={incomeImg} alt='Entrada' />
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox
                    type='button'
                    onClick={ () => {setType('withdraw') }}
                    isActive={type === 'withdraw'}
                    activeColor={'red'}
                >
                    <img src={outcomeImg} alt='Saída' />
                    <span>Saída</span>
                </RadioBox>

            </TransactionTypeContainer>

            <input type="text" placeholder='Categoria' />

            <button type='submit'>
                Cadastrar
            </button>
          </Container>
        </Modal>
    );
}