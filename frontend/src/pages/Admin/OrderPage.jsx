import { Spin, Table } from 'antd';
import {  message } from 'antd';
import React, { useEffect, useState } from 'react'


const OrderPage = () => {

   
    const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

    const [dataSource,setDataSource] = useState([]);
    const [loading,setLoading] = useState(false);


   
      const columns = [
        {
            title: 'Müsteri Email',
            dataIndex: 'receipt_email',
            key: 'receipt_email',
           
          },
        {
          title: 'Sipariş Fiyatı',
          dataIndex: 'amount',
          key: 'amount',
         
        },
      
      ];

   
      const fetchData = async()=> {
       
        try {
            setLoading(true)
            const response = await fetch(`https://api.stripe.com/v1/payment_intents`,{
              method:"GET",
              headers:{
                Authorization:`Bearer ${MY_STRIPE_SECRET_KEY} `
              }
            })
          
           if(response.ok){
            const {data} = await response.json();
            setDataSource(data)
           }else {
            message.error("Kategoriler getirilemedi ")
           }

        } catch (error) {
            console.log("Giriş hatası",error);
        }finally{
            setLoading(false)
        }
        
    }
    
    useEffect(()=> {
            fetchData()
    },[])
  return (
    
       <Table 
   dataSource={dataSource}
    columns={columns} 
    rowKey={(record)=> record.id} 
    loading={loading}/>

  
  
  )
}

export default OrderPage