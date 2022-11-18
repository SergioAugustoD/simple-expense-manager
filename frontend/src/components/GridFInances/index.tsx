import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useFinances } from "../../hooks/Finance/useFinances";
import { GridCellParams, GridColumnVisibilityModel, GridRowParams, GridValueFormatterParams } from "@mui/x-data-grid";
import Modal from "../Modal";
import * as AiIcons from "react-icons/ai";
import useModal from "../../hooks/Finance/useModal";
import TextField from "@mui/material/TextField";
import { ToastNotification } from "../Utils/ToastNotification";
import { DataGridS, DialogS } from "./styles";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ButtonUtil from "../Button";
import { NumericFormat } from "react-number-format";
import { localizedTextsMap } from "./TranslationsGrid";

type PropUpdate = {
  id: number;
  amount: number;
  description: string;
  type: string;
}

const GridFinances = () => {
  const [dataFinance, setDataFinance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getListFinances, updateFinance, deleteFinance } = useFinances();
  const [dataFinanceUpdate, setDataFinanceUpdate] = useState<PropUpdate>({ id: null, amount: 0, description: "", type: "" });
  const { isOpen, toggle } = useModal();
  const [open, setOpen] = React.useState(false);

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
      flex: 0.1,
      cellClassName: (params: GridCellParams<string>) => {
        if (params.value === "S") {
          return "rowRed";
        } else {
          return "rowGreen";
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
      .then((res: any) => {
        if (res.finance.err) {
          ToastNotification.toastError(res.finance.err);
        }
        ToastNotification.toastSuccess(res.finance.msg);
        toggle();
        window.location.reload();
      });

  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteFinance(dataFinanceUpdate.id)
      .then((res: any) => {

        if (res) {
          ToastNotification.toastSuccess(res.finance.msg);
          setOpen(false);
          toggle();

        } else {
          ToastNotification.toastError(res.finance);
        }
      });

  };
  useEffect(() => {
    const getFinances = async () => {
      const finances = await getListFinances(parseInt(localStorage.getItem("id_user")));
      if (finances.data) {
        setDataFinance(finances.data);
        setIsLoading(false);
      }
    };
    getFinances();
  }, [open]);

  return (
    <>
      <Box>
        <Modal isOpen={isOpen} toggle={toggle}>
          <DialogS
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                Você realmente deseja excluir este registro ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <ButtonUtil onClick={handleClose} title="Não" />
              <ButtonUtil onClick={handleDelete} title="Sim" />
            </DialogActions>
          </DialogS>
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
          <NumericFormat
            onValueChange={(values) => {
              setDataFinanceUpdate({ ...dataFinanceUpdate, amount: values.floatValue });
            }}
            value={dataFinanceUpdate.amount}
            prefix={"R$ "}
            allowLeadingZeros
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            customInput={TextField}
            type="text"
          />
          <TextField
            label='Descrição'
            defaultValue={dataFinanceUpdate.description}
            onChange={(e) => setDataFinanceUpdate({ ...dataFinanceUpdate, description: e.target.value })}
          />
          <ButtonUtil onClick={handleSubmit} className="bt-add" title="Atualizar" endIcon={<AiIcons.AiOutlineSync />} />
          <ButtonUtil onClick={handleClickOpen} className="bt-remove" title="Deletar" endIcon={<AiIcons.AiFillDelete />} />
        </Modal>
        <DataGridS
          sx={{
            border: "0"
            ,
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
          onColumnVisibilityModelChange={(newModel: any) =>
            setColumnVisibilityModel(newModel)
          }
          loading={isLoading}
          rows={dataFinance}
          columns={columns}
          disableSelectionOnClick
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowClassName={() => {
            return "colorCell";
          }}
          autoHeight={true}
          density='standard'
          onRowDoubleClick={(params: GridRowParams) => {
            setDataFinanceUpdate({ id: params.row.id, amount: params.row.amount, description: params.row.description, type: params.row.type });
            toggle();
          }}
          localeText={localizedTextsMap}
        />
      </Box>
    </>
  );
};

export default GridFinances;
