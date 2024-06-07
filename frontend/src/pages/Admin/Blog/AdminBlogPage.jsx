import { Space, Table } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminBlogPage = () => {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [dataSource,setDataSource] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()

   
      const columns = [
        {
            title: 'Blog Görseli',
            dataIndex: 'blogPhoto',
            key: 'blogPhoto',
            render:(imgSrc)=> (
              <img src={imgSrc} style={{width:'100px', borderRadius:'10%'}} />
            )
          },
        {
          title: 'Blog Başlığı',
          dataIndex: 'blogTitle',
          key: 'blogTitle',
          render:(text)=> <b>{text}</b>
        },
        {
          title: 'Blog ',
          dataIndex: 'description',
          key: 'description',
          render:(text)=> <b>{text}</b>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render:(text,record)=> (
                <Space>
                    <Button  type='primary' onClick={()=>navigate(`/admin/blog/update/${record._id}`)} >
                        Düzenle
                    </Button>
                      <Popconfirm
                    title="Bloğu Sil"
                    description="Bloğu silmek istediğinizden emin misiniz?"
                    onConfirm={()=> deleteBlog(record._id)}
                    okText="Evet"
                    cancelText="Hayır"
                >
                    <Button danger>Sil</Button>
                </Popconfirm>

                </Space>
              
            )
          }
      ];

      const fetchData= async()=> {
       
        try {

          const blogsRes= await fetch(`${apiUrl}/api/blog`)
         
  
          if (!blogsRes.ok ) {
            message.error("Veri getirme başarısız.");
            return;
          }
           const blogsData = await blogsRes.json()
        
          setDataSource(blogsData);
        } catch (error) {
            console.log("Giriş hatası",error);
        }finally{
            setLoading(false)
        }
        
    }
    const deleteBlog =async (blogId)=> {

        try {
          
            const response = await fetch(`${apiUrl}/api/blog/${blogId}`,
           { method:"DELETE"})
          
           if(response.ok){
            message.success("Blog başarı ile silindi")
           //fetchCategories()
           setDataSource((prevBlog)=> {
            return prevBlog.filter((blog)=> blog._id !== blogId)

           })
           }else {
            message.error("Blog silinemedi ")
           }

        } catch (error) {
            console.log("Silme hatası",error);
        }

    }
    useEffect(()=> {
            fetchData()
    },[apiUrl])
  return (
   <Table 
   dataSource={dataSource}
    columns={columns} 
    rowKey={(record)=> record._id} 
    loading={loading}/>
  )
}

export default AdminBlogPage