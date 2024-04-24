import { Button, Checkbox, Form, Input, InputNumber, Select, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form]=Form.useForm()
  const navigate = useNavigate()

  const params = useParams();
  const productId = params.id;
  console.log(singleProduct);



  const onFinish = async (values) => {

    const imgLinks = values.img.split("\n").map((link)=> link.trim());
    const colors = values.colors.split("\n").map((color)=> color.trim());
    const sizes = values.sizes.split("\n").map((size)=> size.trim());
   
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price:{
            current:values.current,
            discount: values.discount
          },colors,
          size:sizes,
          img:imgLinks
        }),
      });
      if(response.ok){
        message.success("Ürün Güncellendi");
       navigate("/admin/products")
      }else {
        message.info("Ürün güncellerken bir hata oluştu")
      }
    } catch (error) {
      message.error("Bir hata oldu.")
    }finally {
      setLoading(false)
    }
   
  };

 const fetchData= async()=> {
        try {
          const [categoriesResponse, singleProductResponse] = await Promise.all([
            fetch(`${apiUrl}/api/categories`),
            fetch(`${apiUrl}/api/products/${productId}`),
          ]);
  
          if (!categoriesResponse.ok || !singleProductResponse.ok) {
            message.error("Veri getirme başarısız.");
          }
  
          const [categoriesData, singleProductData] = await Promise.all([
            categoriesResponse.json(),
            singleProductResponse.json(),
          ]);
  
          setCategories(categoriesData)
  
          setSingleProduct(singleProductData);

          if(singleProduct){
            form.setFieldsValue({
              name:singleProductData.name,
              current:singleProductData.price.current,
              discount:singleProductData.price.discount,
              description:singleProductData.description,
              img: singleProductData.img.join("\n"),
              colors : singleProductData.colors.join("\n"),
              sizes : singleProductData.size.join("\n"),
              category:singleProductData.category
            })
          }
        } catch (error) {
            console.log("Giriş hatası",error);
        }finally{
            setLoading(false)
        }
        
    }

  useEffect(()=>{
    fetchData()
  },[apiUrl,productId,form])


  return (
    <Spin spinning={loading}>
       <Form
     form={form}
      onFinish={onFinish}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 900 }}
    >
      <Form.Item
        label="Ürün ismi"
        name="name"
        rules={[{ required: true, message: "Please input category!" }]}
      >
        <Input />
      </Form.Item>
       {/* ürün kategorisi */}
       <Form.Item
        label="Ürün Kategorisi"
        name="category"
        rules={[{ required: true, message: "Lütfen en az 1 kategori  seçin" }]}
      >
       <Select>
        { categories.map((category)=> (
              <Select.Option values={category._id} key={category._id}>
              {category.name}
            </Select.Option>
        ))}
        
       </Select>
      </Form.Item>
        {/* ürün fiyatı */}
      <Form.Item
        label="Fiyat"
        name="current"
        rules={[{ required: true, message: "Ürün fiyatını girin" }]}
      >
        <InputNumber/>
      </Form.Item>
       {/* ürün indirim oranı */}
       <Form.Item
        label="İndirim oranı"
        name="discount"
      >
        <InputNumber/>
      </Form.Item>
       {/* description */}
       <Form.Item
        label="Ürün açıklaması"
        name="description"
        rules={[{  message: "Ürün açıklaması girin" }]}
      >
       <ReactQuill theme="snow" style={{
        background:"white"
       }}/>
      </Form.Item>
      {/* GÖRSEL LİNKLERİ */}
      <Form.Item
        label="Ürün Görselleri (Linkler)"
        name="img"
        rules={[{ required: true, message: "Lütfen en az 4 görsel linki ekleyin" }]}
      >
        <Input.TextArea 
        autoSize={{minRows:4}}
        placeholder="Her bir görsel linkini yeni bir satıra yazın"/>
      </Form.Item>
      {/* RENKLER */}
      <Form.Item
        label="Ürün Renkleri (Rgb Kodları)"
        name="colors"
        rules={[{ required: true, message: "Lütfen en az 1 ürün rengi  ekleyin" }]}
      >
        <Input.TextArea 
        autoSize={{minRows:4}}
        placeholder="Her bir ürün Rgb kodunu  yeni bir satıra yazın"/>
      </Form.Item>
      {/* BEDENLER */}
      <Form.Item
        label="Ürün Bedenleri"
        name="sizes"
        rules={[{ required: true, message: "Lütfen en az 1 ürün bedeni  ekleyin" }]}
      >
        <Input.TextArea 
        autoSize={{minRows:4}}
        placeholder="Her bir ürün bedenini yeni bir satıra yazın"/>
      </Form.Item>
      
       <Button type="primary" htmlType="submit">
        Güncelle
      </Button> 
    </Form>

    </Spin>
   
  );
};

export default UpdateProductPage;
