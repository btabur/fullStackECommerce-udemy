import { Button, Checkbox, Form, Input, InputNumber, Select, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateBlogPage = () => {
  const [loading, setLoading] = useState(false);
 
  const [singleBlog, setSingleBlog] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form]=Form.useForm()
  const navigate = useNavigate()

  const params = useParams();
  const blogId = params.id;

  const onFinish = async (values) => {

    
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/blog/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if(response.ok){
        message.success("Blog Güncellendi");
       navigate("/admin/blog")
      }else {
        message.info("Blog güncellerken bir hata oluştu")
      }
    } catch (error) {
      message.error("Bir hata oldu.")
    }finally {
      setLoading(false)
    }
   
  };

 const fetchData= async()=> {
        try {
          const blogRes = await fetch(`${apiUrl}/api/blog/${blogId}`)
  
          if (!blogRes.ok ) {
            message.error("Veri getirme başarısız.");
            return
          }
          const blogData = await blogRes.json()
  
          setSingleBlog(blogData);

          if(singleBlog){
            form.setFieldsValue({
              blogTitle:blogData.blogTitle,
              description:blogData.description,
              blogPhoto: blogData.blogPhoto
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
  },[apiUrl,blogId,form])


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
        label="Blog Başlığı"
        name="blogTitle"
        rules={[{ required: true, message: "Lütfen bir başlık girin!" }]}
      >
        <Input />
      </Form.Item>
      
       {/* description */}
       <Form.Item
        label="Blo açıklaması"
        name="description"
        rules={[{  message: "Ürün açıklaması girin" }]}
      >
       <Input.TextArea 
        autoSize={{minRows:20}}/>
      </Form.Item>
      {/* GÖRSEL LİNKLERİ */}
      <Form.Item
        label="Blog Görseli (Linkler)"
        name="blogPhoto"
        rules={[{ required: true, message: "Lütfen en az 1 görsel linki ekleyin" }]}
      >
        <Input

        placeholder="Bir görsel linki girin"/>
      </Form.Item>
     
      
       <Button type="primary" htmlType="submit">
        Güncelle
      </Button> 
    </Form>

    </Spin>
   
  );
};

export default UpdateBlogPage;
