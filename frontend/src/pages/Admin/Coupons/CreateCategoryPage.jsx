import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateCategoryPage = () => {
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
      style={{ maxWidth: 600 }}
     
    >
      <Form.Item
        label="Kategori ismi"
        name="name"
        rules={[{ required: true, message: "Please input category!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Kategori Görseli"
        name="img"
        rules={[{ required: true, message: "Please input image" }]}
      >
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Oluştur
      </Button>
    </Form>

    </Spin>
   
  );
};

export default CreateCategoryPage;
