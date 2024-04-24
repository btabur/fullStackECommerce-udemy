import { Space, Table } from 'antd';
import { Button, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [dataSource,setDataSource] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()

   
      const columns = [
        {
            title: 'Ürün Görseli',
            dataIndex: 'img',
            key: 'img',
            render:(imgSrc)=> (
              <img src={imgSrc[0]} style={{width:'100px', borderRadius:'10%'}} />
            )
          },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render:(text)=> <b>{text}</b>
        },
        {
          title: 'Kategory',
          dataIndex: 'categoryName',
          key: 'categoryName',
          render:(text)=> <span>{text}</span>
        },
        {
          title: 'Fiyat',
          dataIndex: 'price',
          key: 'price',
          render:(text)=> <span>{text.current.toFixed(2)}</span>
        },
        {
          title: 'İndirim oranı',
          dataIndex: 'price',
          key: 'price',
          render:(text)=> <span>%{text.discount.toFixed(2)}</span>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render:(text,record)=> (
                <Space>
                    <Button  type='primary' onClick={()=>navigate(`/admin/products/update/${record._id}`)} >
                        Düzenle
                    </Button>
                      <Popconfirm
                    title="Kategoriyi Sil"
                    description="Kategoriyi silmek istediğinizden emin misiniz?"
                    onConfirm={()=> deleteProduct(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>

                </Space>
              
            )
          }
      ];

      const fetchData= async()=> {
       
        try {
          const [categoriesResponse, productsResponse] = await Promise.all([
            fetch(`${apiUrl}/api/categories`),
            fetch(`${apiUrl}/api/products`),
          ]);
  
          if (!categoriesResponse.ok || !productsResponse.ok) {
            message.error("Veri getirme başarısız.");
          }
  
          const [categoriesData, productsData] = await Promise.all([
            categoriesResponse.json(),
            productsResponse.json(),
          ]);
  
          const productsWithCategories = productsData.map((product) => {
            const categoryId = product.category;
            const category = categoriesData.find(
              (item) => item._id === categoryId
            );
  
            return {
              ...product,
              categoryName: category ? category.name : "",
            };
          });
  
          setDataSource(productsWithCategories);
        } catch (error) {
            console.log("Giriş hatası",error);
        }finally{
            setLoading(false)
        }
        
    }
    const deleteProduct =async (productId)=> {

        try {
          
            const response = await fetch(`${apiUrl}/api/products/${productId}`,
           { method:"DELETE"})
          
           if(response.ok){
            message.success("Ürün başarı ile silindi")
           //fetchCategories()
           setDataSource((prevProduct)=> {
            return prevProduct.filter((product)=> product._id !== productId)

           })
           }else {
            message.error("Ürün silinemedi ")
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

export default ProductPage