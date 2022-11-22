import React, { useState, useCallback, useEffect } from "react";
import { Link } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Container from "@mui/material/Container";
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
import { CardS, FinancesContent, InfoNotLogin, StackS } from "./styles";
import { NumericFormat } from "react-number-format";

type PropInsert = {
  amount: number;
  description: string;
  type: string;
  id_user: number;
}

const Finances = () => {
  const navigate = useNavigate();
  const { insertFinance, getListFinances } = useFinances();
  const [dataFinanceInsert, setDataFinanceInsert] = useState<PropInsert>({ amount: 0, description: "", type: "", id_user: parseInt(localStorage.getItem("id_user")) });
  const { isOpen, toggle } = useModal();
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
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

  useEffect(() => {
    const getFinances = async () => {
      const finances = await getListFinances(parseInt(localStorage.getItem("id_user")));
      if (finances.data) {
        setAmountIn(finances.amountIn);
        setAmountOut(finances.amountOut);
      }
    };
    getFinances();
  }, []);
  return (
    <div>
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
        </InfoNotLogin>
        :
        <FinancesContent>
          <Container maxWidth="md">
            <div className="buttons-main">
              <StackS>
                <CardS backgroundColor="green">
                  <h4>Entrada</h4>
                  {currencyFormatter.format(parseFloat(amountIn))}
                </CardS>
                <CardS backgroundColor="red">
                  <h4>Saída</h4>
                  {currencyFormatter.format(parseFloat(amountOut))}
                </CardS>
                <CardS backgroundColor={(parseFloat(amountIn) - parseFloat(amountOut)) < 0 ? "red" : "green"}>
                  <h4>Total</h4>
                  {currencyFormatter.format(parseFloat(amountIn) - parseFloat(amountOut))}
                </CardS>
              </StackS>
              <ButtonUtil title="Adicionar" onClick={toggle} className="bt-add" variant="contained" endIcon={<IoIcons.IoMdAddCircleOutline />} />
            </div>
          </Container>
          <div className="grid-data">
            <GridFinances />
          </div>
        </FinancesContent>

      }
    </div>
  );
};

export default Finances;