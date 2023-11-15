import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {authenticated} from '../store'
import { useNavigate } from 'react-router-dom'

function Guest({children}) {
  const redirect = useNavigate()
  const auth = useRecoilValue(authenticated)

  useEffect( () => {
    if (auth.check) {
      redirect('/admin')
    }
  }, [auth.check, redirect])
  return children
}

export default Guest