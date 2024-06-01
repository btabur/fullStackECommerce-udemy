import { Button, Checkbox, Form, Input, InputNumber, Select, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextArea from "antd/es/input/TextArea";

const CreateBlogPage = () => {
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form]=Form.useForm()

  const onFinish = async (values) => {

    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if(response.ok){
        message.success("Blog eklendi");
        form.resetFields()
      }else {
        message.info("Blog eklerken bir hata oluştu")
      }
    } catch (error) {
      message.error("Bir hata oldu.")
    }finally {
      setLoading(false)
    }
   
  };


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
        label="Blog ismi"
        name="blogTitle"
        rules={[{ required: true, message: "Please input blog title!" }]}
      >
        <Input />
      </Form.Item>
     
        
      <Form.Item
        label="Açıklama"
        name="description"
        rules={[{ required: true, message: "Açılama girin" }]}
      >
        <Input.TextArea  autoSize={{minRows:24}} placeholder=" Blog girin"/>
      </Form.Item>
      
     
      <Form.Item
        label="Blog Görseli girin (Link)"
        name="blogPhoto"
        rules={[{ required: true, message: "Lütfen en az 1 görsel linki ekleyin" }]}
      >
        <Input
        placeholder="bir görsel linki yazın"/>
      </Form.Item>
    
       <Button type="primary" htmlType="submit">
        Oluştur
      </Button> 
    </Form>

    </Spin>
   
  );
};

export default CreateBlogPage;
