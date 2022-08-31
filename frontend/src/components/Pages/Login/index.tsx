import React, { useCallback, useState } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import { ILogin } from '../../../interfaces/User/ILogin';

function Login() {
  const { login } = useLogin();
  const [dataLogin, setDataLogin] = useState<ILogin>({ login: '', password: '' });

  const handleSubmit = useCallback(async () => {
    console.log(dataLogin)
    await login(dataLogin);
  }, [login, dataLogin]);

  return (
    <div className='home'>
      <input type="text" name="login" id="" onChange={(e) => setDataLogin({ ...dataLogin, login: e.target.value })} />
      <input type="password" name="password" id="" onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
      <input type="submit" onClick={handleSubmit} />
    </div>
  );
}

export default Login;