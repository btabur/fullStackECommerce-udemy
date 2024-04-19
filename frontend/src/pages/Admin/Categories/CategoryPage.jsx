import { Space, Table } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [dataSource,setDataSource] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()

   
      const columns = [
        {
            title: 'Kategori Görseli',
            dataIndex: 'img',
            key: 'img',
            render:(imgSrc)=> (
              <img src={imgSrc} style={{width:'100px', borderRadius:'10%'}} />
            )
          },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render:(text)=> <b>{text}</b>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render:(text,record)=> (
                <Space>
                    <Button  type='primary' onClick={()=>navigate(`/admin/categories/update/${record._id}`)} >
                        Düzenle
                    </Button>
                      <Popconfirm
                    title="Kategoriyi Sil"
                    description="Kategoriyi silmek istediğinizden emin misiniz?"
                    onConfirm={()=> deleteCategory(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>

                </Space>
              
            )
          }
      ];

      const fetchCategories = async()=> {
       
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/api/categories`)
          
           if(response.ok){
            const data = await response.json();
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
    const deleteCategory =async (categoryId)=> {

        try {
          
            const response = await fetch(`${apiUrl}/api/categories/${categoryId}`,
           { method:"DELETE"})
          
           if(response.ok){
            message.success("Kategori başarı ile silindi")
           fetchCategories()
           }else {
            message.error("Kategori silinemedi ")
           }

        } catch (error) {
            console.log("Silme hatası",error);
        }

    }
    useEffect(()=> {
            fetchCategories()
    },[])
  return (
   <Table 
   dataSource={dataSource}
    columns={columns} 
    rowKey={(record)=> record._id} 
    loading={loading}/>
  )
}

export default CategoryPage