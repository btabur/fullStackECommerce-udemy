import { Table } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'

const AdminUserPage = () => {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [dataSource,setDataSource] = useState([]);
    const [loading,setLoading] = useState(false);

   
      const columns = [
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
          },
        {
          title: 'Avatar',
          dataIndex: 'avatar',
          key: 'avatar',
          render:(imgSrc)=> (
            <img src={imgSrc} style={{width:'50px', borderRadius:'50%'}} />
          )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render:(text,record)=> (
                <Popconfirm
                    title="KUllanıcıyı Sil"
                    description="Kullanıcıyı silmek istediğinizden emin misiniz?"
                    onConfirm={()=> deleteUser(record.email)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            )
          }
      ];

      const fetchUser = async()=> {
       
        try {
            setLoading(true)
            const response = await fetch(`${apiUrl}/api/users`)
          
           if(response.ok){
            const data = await response.json();
            setDataSource(data)
           }else {
            message.error("Kullanıcılar getirilemedi ")
           }

        } catch (error) {
            console.log("Giriş hatası",error);
        }finally{
            setLoading(false)
        }
        
    }
    const deleteUser =async (userEmail)=> {

        try {
          
            const response = await fetch(`${apiUrl}/api/users/${userEmail}`,
           { method:"DELETE"})
          
           if(response.ok){
            message.success("Kullanıcı başarı ile silindi")
           fetchUser()
           }else {
            message.error("Kullanıcı silinemedi ")
           }

        } catch (error) {
            console.log("Silme hatası",error);
        }

    }
    useEffect(()=> {
            fetchUser()
    },[])
  return (
   <Table 
   dataSource={dataSource}
    columns={columns} 
    rowKey={(record)=> record._id} 
    loading={loading}/>
  )
}

export default AdminUserPage