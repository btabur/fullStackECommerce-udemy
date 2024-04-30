import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form]=Form.useForm()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/coupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if(response.ok){
        message.success("Kupon oluşturuldu");
        form.resetFields()
      }else {
        message.info("Kupon oluşurken bir hata oluştu")
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
        label="Kupon ismi"
        name="code"
        rules={[{ required: true, message: "Bir kupon kodu girin" }]}
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
        Oluştur
      </Button>
    </Form>

    </Spin>
   
  );
};

export default CreateCouponPage;
