import { Box, CircularProgress, Link } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth/AuthContext';
import ButtonUtil from '../../Button';
import GridFinances from '../../GridFInances';

import './styles.scss'

const Finances = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [isLoading])

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
      <CircularProgress />
    </Box>
  }

  return (
    <div>
      {!auth.user &&
        <div className="info-notlogin">
          <h2>Apenas usuários logados podem acessar esta página</h2>
          <Link underline='hover' onClick={() => navigate('/login')} variant='inherit'>Clique aqui para logar</Link>
        </div>
      } :
      <div className='finances-content'>
        <div className="finances-content__buttons-main">
          <ButtonUtil title="Adicionar" onClick={() => console.log('Adicionar')} />
        </div>
        <div className="finances-content__grid-data">
          <GridFinances />
        </div>
      </div>
    </div>
  );
}

export default Finances;