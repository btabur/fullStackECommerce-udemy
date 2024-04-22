import { Button, Checkbox, Form, Input, InputNumber, Select, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form]=Form.useForm()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if(response.ok){
        message.success("Kategori oluşturuldu");
        form.resetFields()
      }else {
        message.info("Kategori oluşurken bir hata oluştu")
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
        label="Ürün ismi"
        name="name"
        rules={[{ required: true, message: "Please input category!" }]}
      >
        <Input />
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
        rules={[{  message: "İndirim açıklaması girin" }]}
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
       {/* ürün kategorisi */}
       <Form.Item
        label="Ürün Kategorisi"
        name="category"
        rules={[{ required: true, message: "Lütfen en az 1 kategori  seçin" }]}
      >
       <Select>
          <Select.Option values="SmartPhone" key={"SmartPhone"}>
            SmartPhone
          </Select.Option>
       </Select>
      </Form.Item>
      
     

      {/* <Button type="primary" htmlType="submit">
        Oluştur
      </Button> */}
    </Form>

    </Spin>
   
  );
};

export default CreateProductPage;
