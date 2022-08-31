import React from 'react';
import Button from '../../Button';
import GridFinances from '../../GridFInances';

import './styles.scss'

function Finances() {
  return (
    <div className='finances-content'>
      <div className="finances-content__buttons-main">
        <Button nameButton="Adicionar" onClick={() => console.log('Adicionar')} />
      </div>
      <div className="finances-content__grid-data">
        <GridFinances />
      </div>
    </div>
  );
}

export default Finances;