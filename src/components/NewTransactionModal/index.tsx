import { FormEvent, useState, useContext } from 'react'
import Modal from 'react-modal'
import { TransactionsContext } from '../../TransactionsContext';
import { api } from '../../services/api'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { TransactionTypeContainer, RadioBox } from './style'
import { Container } from './style'

type NewTransactionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void; // retorno dessa função e vazio
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps ){
  const {createTransaction} = useContext(TransactionsContext);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');


  async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault()
    await createTransaction({
      title,
      amount,
      category,
      type,
    })
    setTitle('')
    setAmount(0)
    setType('')
    setCategory('deposit');
    onRequestClose();
  }

  return(
    <Modal 
    isOpen={isOpen} 
    onRequestClose={onRequestClose}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >
    
    <button type="button" 
    onClick={onRequestClose} 
    className="react-modal-closed">

    <img src={closeImg} alt="fechar modal" />
    </button>

    <Container onSubmit={handleCreateNewTransaction}>
    <h2>Cadastrar Transação</h2>

    <input
     placeholder="Titulo"
     value={title}
     onChange={event => setTitle(event.target.value)}
     />

    <input
    type='number'
    placeholder="Valor"
    value={amount}
    onChange={event => setAmount(Number(event.target.value))} //Todo onChange recebe string, teria que ser convertido para number
    />

    <TransactionTypeContainer>
    <RadioBox
    type="button"
     // className={type === 'deposit' ? 'active' : ''}
    onClick={() => {setType('deposit')}}
    isActive={type === 'deposit'}
    activeColor="green"
    >
      <img src={incomeImg} alt="Entrada" />
      <span>Entrada</span>
    </RadioBox>

    <RadioBox 
    type="button"
    // className={type === 'withdraw' ? 'active' : ''}
    onClick={() => {setType('withdraw')}}
    isActive={type === 'withdraw'}
    activeColor="red"
    >
      <img src={outcomeImg} alt="Saida" />
      <span>Saida</span>
    </RadioBox>
    </TransactionTypeContainer>

    <input placeholder="Categoria"
      value={category}
      onChange={event => setCategory(event.target.value)}
    />

    <button type="submit">
      Cadastrar
    </button>
    </Container>
    </Modal>
  )
}