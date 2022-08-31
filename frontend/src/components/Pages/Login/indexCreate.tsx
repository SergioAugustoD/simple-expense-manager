import React, { useCallback, useState } from 'react';
import { useCreateUser } from '../../../hooks/useCreateUser';
import { ICreateUser } from '../../../interfaces';

function Login() {
  const { createUser } = useCreateUser();
  const [dataUser, setDataUser] = useState<ICreateUser>({ name: '', email: '', login: '', password: '' });

  const handleSubmit = useCallback(async () => {
    console.log(dataUser)
    await createUser(dataUser);
  }, [createUser, dataUser]);

  return (
    <div className='home'>
      <input type="text" name="name" id="" onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })} />
      <input type="email" name="email" id="" onChange={(e) => setDataUser({ ...dataUser, email: e.target.value })} />
      <input type="text" name="login" id="" onChange={(e) => setDataUser({ ...dataUser, login: e.target.value })} />
      <input type="password" name="password" id="" onChange={(e) => setDataUser({ ...dataUser, password: e.target.value })} />
      <input type="submit" onClick={handleSubmit} />
    </div>
  );
}

export default Login;