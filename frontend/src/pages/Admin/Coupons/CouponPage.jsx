import { Space, Table } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CouponPage = () => {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [dataSource,setDataSource] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()

   
      const columns = [
        {
            title: 'Kupon Kodu',
            dataIndex: 'code',
            key: 'code',
            render:(code)=> (
              <b> {code}</b>
            )
          },
        {
          title: 'İndirim Oranı',
          dataIndex: 'discountPercent',
          key: 'discountPercent',
          render:(count)=> <b>%{count}</b>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render:(text,record)=> (
                <Space>
                    <Button  type='primary' onClick={()=>navigate(`/admin/coupons/update/${record._id}`)} >
                        Düzenle
                    </Button>
                      <Popconfirm
                    title="Kategoriyi Sil"
                    description="Kategoriyi silmek istediğinizden emin misiniz?"
                    onConfirm={()=> deleteCoupon(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Sil</Button>
                </Popconfirm>

                </Space>
              
            )
          }
      ];

      const fetchCoupons = async()=> {
       
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/api/coupons`)
          
           if(response.ok){
            const data = await response.json();
            setDataSource(data)
           }else {
            message.error("Kuponlar getirilemedi ")
           }

        } catch (error) {
            console.log("Giriş hatası",error);
        }finally{
            setLoading(false)
        }
        
    }
    const deleteCoupon =async (categoryId)=> {

        try {
          
            const response = await fetch(`${apiUrl}/api/coupons/${categoryId}`,
           { method:"DELETE"})
          
           if(response.ok){
            message.success("Kupon başarı ile silindi")
           fetchCoupons()
           }else {
            message.error("Kupon silinemedi ")
           }

        } catch (error) {
            console.log("Silme hatası",error);
        }

    }
    useEffect(()=> {
            fetchCoupons()
    },[])
  return (
   <Table 
   dataSource={dataSource}
    columns={columns} 
    rowKey={(record)=> record._id} 
    loading={loading}/>
  )
}

export default CouponPage