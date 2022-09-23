import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import './styles.scss'
import { useFinances } from '../../hooks/useFinances';
import { DataGrid, GridCallbackDetails, GridColumnVisibilityModel, GridRowClassNameParams, GridRowParams, GridValueFormatterParams, MuiEvent } from '@mui/x-data-grid';
import Modal from "../Modal";
import useModal from "../../hooks/useModal";
import TextField from '@mui/material/TextField';
import { ToastNotification } from '../Utils/ToastNotification';

type PropUpdate = {
  id: number;
  amount: number;
  category: string;
  description: string;
  type: string;
}

const GridFinances = () => {
  const [dataFinance, setDataFinance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const { getListFinances, updateFinance } = useFinances();
  const [dataFinanceUpdate, setDataFinanceUpdate] = useState<PropUpdate>({ id: null, category: '', amount: 0, description: '', type: '' });
  const { isOpen, toggle } = useModal();

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 90,
      hideable: true
    },
    {
      field: 'category',
      headerName: 'Categoria',
      flex: 0.2,
    },
    {
      field: 'amount',
      headerName: 'Valor',
      flex: 0.4,
      valueFormatter: (params: GridValueFormatterParams) => {
        if (!params.value) {
          return params.value;
        }
        return currencyFormatter.format(params.value);
      },
    },
    {
      field: 'description',
      headerName: 'Descrição',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Tipo',
      flex: 0.2
    }
  ];

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false
    });

  const handleSubmit = async () => {
    await updateFinance(dataFinanceUpdate)
      .then((res) => {
        if (res.finance.err) {
          ToastNotification.toastError(res.finance.err);
        }
        ToastNotification.toastSuccess(res.finance.msg);
        toggle();
      })

  };

  useEffect(() => {
    const getFinances = async () => {
      const data = await getListFinances(parseInt(localStorage.getItem('id_user')));
      if (data) {
        var caclTotal = data.reduce((sum: number, finance: any) => {
          if (finance.type === 'Despesa')
            return sum - parseFloat(finance.amount);
          else
            return sum + parseFloat(finance.amount);
        }, 0);
        setDataFinance(data);
        setTotal(caclTotal)
        setIsLoading(false);
      }
    }
    getFinances();
  }, [getListFinances, isOpen])

  return (
    <div className="container">
      <Box>
        {/* <button onClick={toggle} disabled={dataFinanceUpdate.id ? false : true}>Open Modal </button> */}
        <Modal isOpen={isOpen} toggle={toggle}>
          <div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <NativeSelect
                defaultValue={dataFinanceUpdate.category}
                onChange={(e) => setDataFinanceUpdate({ ...dataFinanceUpdate, category: e.target.value })}
              >
                <option value='Cartão'>Cartão</option>
                <option value='Casa'>Casa</option>
                <option value='Filhos'>Filhos</option>
                <option value='Pets'>Pets</option>
                <option value='Automóvel'>Automóvel</option>
              </NativeSelect>

            </FormControl>
            <TextField
              label='Valor'
              defaultValue={dataFinanceUpdate.amount}
              onChange={(e) => setDataFinanceUpdate({ ...dataFinanceUpdate, amount: parseFloat(e.target.value) })}
            />
            <TextField
              label='Descrição'
              defaultValue={dataFinanceUpdate.description}
              onChange={(e) => setDataFinanceUpdate({ ...dataFinanceUpdate, description: e.target.value })}
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <NativeSelect
                defaultValue={dataFinanceUpdate.type}
                onChange={(e) => setDataFinanceUpdate({ ...dataFinanceUpdate, type: e.target.value })}
              >
                <option value='Despesa'>Despesa</option>
                <option value='Receita'>Receita</option>
              </NativeSelect>
            </FormControl>
            <button onClick={handleSubmit}>Enviar </button>
          </div>
        </Modal>
        <DataGrid
          sx={{
            '.MuiDataGrid-row:hover': {
              opacity: '1'
            },
            '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: 'rgba(215, 207, 211, 0.8)'
            },
            '.MuiDataGrid-cell.MuiDataGrid-cell--textLeft': {
              border: 'none',
              outline: 'none',
              fontSize: '20px'
            },
            '.MuiDataGrid-selectedRowCount.css-de9k3v-MuiDataGrid-selectedRowCount': {
              display: 'none'
            },
            '.MuiTablePagination-root.css-rtrcn9-MuiTablePagination-root': {
              margin: '0 0 0 auto'
            }
          }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          loading={isLoading}
          rows={dataFinance}
          columns={columns}
          disableSelectionOnClick
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowClassName={(params: GridRowClassNameParams) => {
            if (params.row.type === 'Receita') {
              return 'rowGreen'
            }
            if (params.row.type === 'Despesa') {
              return 'rowRed'
            }
          }}
          autoHeight={true}
          density='standard'
          onRowDoubleClick={(params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
            setDataFinanceUpdate({ id: params.row.id, amount: params.row.amount, category: params.row.category, description: params.row.description, type: params.row.type });
            toggle()
          }}
        />
      </Box>
      <h2 className={`${Math.sign(total) >= 0 ? 'positiveTotal' : 'negativeTotal'}`}>Total: {currencyFormatter.format(total)}</h2>
    </div>

  );
}

export default GridFinances
