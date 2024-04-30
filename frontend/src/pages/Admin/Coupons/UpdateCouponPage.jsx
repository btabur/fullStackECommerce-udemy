import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();

  const couponId = params.id;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if(response.ok){
        message.success("Kupon güncellendi")
      }else {
        message.info("Kupon güncellenirken bir hata oluştu")
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false)
    }
   
  };

  

  const fetchCoupon = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }

      const data = await response.json();
      if (data) {
        form.setFieldsValue({
          code: data.code,
          discountPercent: data.discountPercent,
        });
      }
    } catch (error) {
      console.log("Giriş hatası", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=> {
    fetchCoupon()
  },[])
  return (
    <Spin spinning={loading}>
       <Form
      form={form}
      onFinish={onFinish}
      name="basic"
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.Item
        label="Kupon ismi"
        name="code"
        rules={[{ required: true, message: "Please input code!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="İndirim Oranı"
        name="discountPercent"
        rules={[{ required: true, message: "Bir indirim oranı girin" }]}
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

export default UpdateCouponPage;
