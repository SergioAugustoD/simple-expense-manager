import React, { useState, useCallback } from "react";
import { Link } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useNavigate } from "react-router-dom";
import ButtonUtil from "../../components/Button";
import GridFinances from "../../components/GridFInances";
import Modal from "../../components/Modal";
import TextField from "@mui/material/TextField";
import useModal from "../../hooks/Finance/useModal";
import * as FiIcons from "react-icons/fi";
import * as IoIcons from "react-icons/io";
import { ToastNotification } from "../../components/Utils/ToastNotification";
import { useFinances } from "../../hooks/Finance/useFinances";
import { FinancesContent, InfoNotLogin } from "./styles";
import { NumericFormat } from "react-number-format";

type PropInsert = {
  amount: number;
  description: string;
  type: string;
  id_user: number;
}

const Finances = () => {
  const navigate = useNavigate();
  const { insertFinance } = useFinances();
  const [dataFinanceInsert, setDataFinanceInsert] = useState<PropInsert>({ amount: 0, description: "", type: "", id_user: parseInt(localStorage.getItem("id_user")) });
  const { isOpen, toggle } = useModal();

  const handleSubmit = useCallback(async () => {
    if (!dataFinanceInsert.type) {
      ToastNotification.toastError("Informe o tipo ");
    } else {
      const data = await insertFinance(dataFinanceInsert);
      if (data.finance.err) {
        ToastNotification.toastError(data.finance.err);
      }
      ToastNotification.toastSuccess(data.finance.msg);
      toggle();
      window.location.reload();
    }

  }, [dataFinanceInsert, insertFinance, toggle]);
  return (
    <div >
      <Modal isOpen={isOpen} toggle={toggle}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
          <NativeSelect
            onChange={(e) => setDataFinanceInsert({ ...dataFinanceInsert, type: e.target.value })}
          >
            <option value=''></option>
            <option value='S'>Saida</option>
            <option value='E'>Entrada</option>
          </NativeSelect>
        </FormControl>
        <NumericFormat
          onValueChange={(values) => {
            setDataFinanceInsert({ ...dataFinanceInsert, amount: values.floatValue });
          }}
          value={dataFinanceInsert.amount}
          prefix={"R$ "}
          allowLeadingZeros
          decimalSeparator=","
          thousandSeparator="."
          decimalScale={2}
          customInput={TextField}
          type="text"
        />
        {/* <TextField
          label='Valor'
          defaultValue={dataFinanceInsert.amount}
          onChange={(e) => setDataFinanceInsert({ ...dataFinanceInsert, amount: parseFloat(e.target.value) })}
        /> */}
        <TextField
          label='Descrição'
          defaultValue={dataFinanceInsert.description}
          onChange={(e) => setDataFinanceInsert({ ...dataFinanceInsert, description: e.target.value })}
        />
        <ButtonUtil onClick={handleSubmit} title="Enviar" className="bt-add" endIcon={<FiIcons.FiSend />} />
      </Modal>
      {!localStorage.getItem("authToken") ?
        <InfoNotLogin>
          <h2>Apenas usuários logados podem acessar esta página</h2>
          <Link underline='hover' onClick={() => navigate("/login")} variant='inherit'>Clique aqui para logar</Link>
        </InfoNotLogin>
        :
        <FinancesContent>
          <div className="buttons-main">
            <ButtonUtil title="Adicionar" onClick={toggle} className="bt-add" variant="contained" endIcon={<IoIcons.IoMdAddCircleOutline />} />
          </div>
          <div className="grid-data">
            <GridFinances />
          </div>
        </FinancesContent>

      }
    </div>
  );
};

export default Finances;