import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useFinances } from "../../hooks/Finance/useFinances";
import { GridColumnVisibilityModel, GridRowClassNameParams, GridRowParams, GridValueFormatterParams } from "@mui/x-data-grid";
import Modal from "../Modal";
import useModal from "../../hooks/Finance/useModal";
import TextField from "@mui/material/TextField";
import { ToastNotification } from "../Utils/ToastNotification";
import { DataGridS, H2Total } from "./styles";

type PropUpdate = {
  id: number;
  amount: number;
  description: string;
  type: string;
}

const GridFinances = () => {
  const [dataFinance, setDataFinance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const { getListFinances, updateFinance } = useFinances();
  const [dataFinanceUpdate, setDataFinanceUpdate] = useState<PropUpdate>({ id: null, amount: 0, description: "", type: "" });
  const { isOpen, toggle } = useModal();

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 90,
      hideable: true
    },
    {
      field: "amount",
      headerName: "Valor",
      flex: 0.4,
      valueFormatter: (params: GridValueFormatterParams) => {
        if (!params.value) {
          return params.value;
        }
        return currencyFormatter.format(params.value);
      },
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Tipo",
      flex: 0.2,
      valueFormatter: (params: GridValueFormatterParams) => {
        if (params.value === "S") {
          return "Saida";
        } else {
          return "Entrada";
        }
      },
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
      });

  };

  useEffect(() => {
    const getFinances = async () => {
      const data = await getListFinances(parseInt(localStorage.getItem("id_user")));
      if (data) {
        const caclTotal = data.reduce((sum: number, finance: any) => {
          if (finance.type === "S")
            return sum - parseFloat(finance.amount);
          else
            return sum + parseFloat(finance.amount);
        }, 0);
        setDataFinance(data);
        setTotal(caclTotal);
        setIsLoading(false);
      }
    };
    getFinances();
  }, [getListFinances, isOpen]);

  return (
    <div className="container">
      <Box>
        {/* <button onClick={toggle} disabled={dataFinanceUpdate.id ? false : true}>Open Modal </button> */}
        <Modal isOpen={isOpen} toggle={toggle}>
          <div>
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
                <option value='S'>Saida</option>
                <option value='E'>Entrada</option>
              </NativeSelect>
            </FormControl>
            <button onClick={handleSubmit}>Enviar </button>
          </div>
        </Modal>
        <DataGridS
          sx={{
            ".MuiDataGrid-row:hover": {
              opacity: "1"
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "rgba(215, 207, 211, 0.8)"
            },
            ".MuiDataGrid-cell.MuiDataGrid-cell--textLeft": {
              border: "none",
              outline: "none",
              fontSize: "20px"
            },
            ".MuiDataGrid-selectedRowCount.css-de9k3v-MuiDataGrid-selectedRowCount": {
              display: "none"
            },
            ".MuiTablePagination-root.css-rtrcn9-MuiTablePagination-root": {
              margin: "0 0 0 auto"
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
            if (params.row.type === "E") {
              return "rowGreen";
            }
            if (params.row.type === "S") {
              return "rowRed";
            }
          }}
          autoHeight={true}
          density='standard'
          onRowDoubleClick={(params: GridRowParams) => {
            setDataFinanceUpdate({ id: params.row.id, amount: params.row.amount, description: params.row.description, type: params.row.type });
            toggle();
          }}
        />
      </Box>
      <H2Total className={`${Math.sign(total) >= 0 ? "positiveTotal" : "negativeTotal"}`}>Total: {currencyFormatter.format(total)}</H2Total>
    </div>

  );
};

export default GridFinances;
