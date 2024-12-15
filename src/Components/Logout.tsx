import React, { memo } from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    const logoutKrwao = () => {
        localStorage.removeItem('token');
        navigate('/signup', {replace: true});
    }

  return (
    <Button variant='outline' className='bg-transparent border-[1px] border-white border-solid' onClick={() => logoutKrwao()}>Logout</Button>
  )
}

export default memo(Logout)