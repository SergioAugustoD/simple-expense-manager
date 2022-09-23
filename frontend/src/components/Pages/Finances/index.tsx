import React, { useState, useCallback } from 'react';
import { Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate } from 'react-router-dom';
import ButtonUtil from '../../Button';
import GridFinances from '../../GridFInances';
import Modal from '../../Modal';
import TextField from '@mui/material/TextField';
import './styles.scss'
import useModal from '../../../hooks/useModal';
import { ToastNotification } from '../../Utils/ToastNotification';
import { useFinances } from '../../../hooks/useFinances'

type PropInsert = {
  amount: number;
  category: string;
  description: string;
  type: string;
  id_user: number;
}

const Finances = () => {
  const navigate = useNavigate();
  const { insertFinance } = useFinances();
  const [dataFinanceInsert, setDataFinanceInsert] = useState<PropInsert>({ category: '', amount: 0, description: '', type: '', id_user: parseInt(localStorage.getItem('id_user')) });
  const { isOpen, toggle } = useModal();

  const handleSubmit = useCallback(async () => {
    if (dataFinanceInsert.category === '') {
      ToastNotification.toastError('Informe a categoria ');
    }
    if (dataFinanceInsert.type === '') {
      ToastNotification.toastError('Informe o tipo ');
    }
    const data = await insertFinance(dataFinanceInsert);
    if (data.finance.err) {
      ToastNotification.toastError(data.finance.err);
    }
    ToastNotification.toastSuccess(data.finance.msg);
    toggle();
    window.location.reload();
  }, [dataFinanceInsert, insertFinance, toggle]);
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <div>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <NativeSelect
              onChange={(e) => setDataFinanceInsert({ ...dataFinanceInsert, category: e.target.value })}
            >
              <option value='#'>#</option>
              <option value='Cartão'>Cartão</option>
              <option value='Casa'>Casa</option>
              <option value='Filhos'>Filhos</option>
              <option value='Pets'>Pets</option>
              <option value='Automóvel'>Automóvel</option>
            </NativeSelect>

          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <NativeSelect
              onChange={(e) => setDataFinanceInsert({ ...dataFinanceInsert, type: e.target.value })}
            >
              <option value='#'>#</option>
              <option value='Despesa'>Despesa</option>
              <option value='Receita'>Receita</option>
            </NativeSelect>
          </FormControl>
          <TextField
            label='Valor'
            defaultValue={dataFinanceInsert.amount}
            onChange={(e) => setDataFinanceInsert({ ...dataFinanceInsert, amount: parseFloat(e.target.value) })}
          />
          <TextField
            label='Descrição'
            defaultValue={dataFinanceInsert.description}
            onChange={(e) => setDataFinanceInsert({ ...dataFinanceInsert, description: e.target.value })}
          />
          <button onClick={handleSubmit}>Enviar </button>
        </div>
      </Modal>
      {!localStorage.getItem('authToken') ?
        <div className="info-notlogin">
          <h2>Apenas usuários logados podem acessar esta página</h2>
          <Link underline='hover' onClick={() => navigate('/login')} variant='inherit'>Clique aqui para logar</Link>
        </div>
        :
        <div className='finances-content'>
          <div className="finances-content__buttons-main">
            <ButtonUtil title="Adicionar" onClick={toggle} />
          </div>
          <div className="finances-content__grid-data">
            <GridFinances />
          </div>
        </div>

      }
    </div>
  );
}

export default Finances;