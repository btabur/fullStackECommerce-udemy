import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();

  const categoryId = params.id;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if(response.ok){
        message.success("Kategori güncellendi")
      }else {
        message.info("Kategori güncellenirken bir hata oluştu")
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false)
    }
   
  };

  useEffect(() => {
    fetchCategory();
  }),
    [];

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`);

      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }

      const data = await response.json();
      if (data) {
        form.setFieldsValue({
          name: data.name,
          img: data.img,
        });
      }
    } catch (error) {
      console.log("Giriş hatası", error);
    } finally {
      setLoading(false);
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
      autoComplete="off"
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
        Güncelle
      </Button>
    </Form>

    </Spin>
   
  );
};

export default UpdateCategoryPage;
