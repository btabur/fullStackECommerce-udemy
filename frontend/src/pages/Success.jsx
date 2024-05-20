import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CardContext } from '../context/CardProvider';
import { Button, Result } from 'antd';

const Success = () => {
    const {setcardItems} = useContext(CardContext);

    useEffect(()=> {
        setcardItems([])
    },[])
  return (
    <div className='succes-page'>
    <div className='container'>
    <Result
    status="success"
    title="Ödeme Başarılı"
    subTitle="Siparişiniz başarı ile tamamlandı"
    extra={[

      <Link to={"/"} key="home">
        <Button type="primary" >
        Ana Sayfa
      </Button>
      </Link>,
      
      <Button key="buy">Siparişlerim</Button>,
    ]}
  />
    </div>    
    </div>
  )
}

export default Success