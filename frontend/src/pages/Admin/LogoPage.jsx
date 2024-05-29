import React, { useEffect, useState } from "react";
import {
  DeleteFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Input, Spin, message } from "antd";

const LogoPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [showAddLogo, setShowAddLogo] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [form]=Form.useForm()

  const fetchLogo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/logo`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("logo getirilemedi ");
      }
    } catch (error) {
      console.log("Giriş hatası", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteLogo = async (logoId) => {
    try {
      const response = await fetch(`${apiUrl}/api/logo/${logoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Logo başarı ile silindi");
        fetchLogo();
      } else {
        message.error("Logo silinemedi ");
      }
    } catch (error) {
      console.log("Silme hatası", error);
    }
  };
  useEffect(() => {
    fetchLogo();
  }, []);


  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/api/logo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if(response.ok){
        message.success("logo oluşturuldu sayfayı yenileyin");
        form.resetFields()
      }else {
        message.info("logo oluşurken bir hata oluştu")
      }
    } catch (error) {
      message.error("Bir hata oldu.")
    }finally {
      setLoading(false)
    }
   
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    > 
    {/* logo var ise yok ise alanı */}
      <div
        style={{
          position: "relative",
        }}
      >
        {dataSource.length > 0 ? (
          <>  <h4>Şu anki logonuz</h4>
            <img
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "15px",
              }}
              src={dataSource.length > 0 && dataSource[0].img}
              alt=""
            />

            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "20px",
                display: "flex",
                gap: "10px",
              }}
            >
              <Button
                onClick={() =>
                  deleteLogo(dataSource.length > 0 && dataSource[0]._id)
                }
                type="primary"
                shape="circle"
                icon={<DeleteFilled />}
              />
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <p>Bir logo ekleyin</p>
            <Button
              onClick={() => setShowAddLogo(true)}
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
            />
          </div>
        )}
      </div>

      {showAddLogo && (
         <Spin  spinning={loading}>
         <Form style={{
          display:"flex",
          marginLeft:"20px",
          maxWidth: 600, 
          gap:"20px",
          alignItems:"center",
          justifyContent:"center"
         }}
       form={form}
        onFinish={onFinish}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
       
       
      >
        <Form.Item
          label="logo url girin"
          name="img"
          rules={[{ required: true, message: "Bir logo url girin" }]}
        >
          <Input />
        </Form.Item>
  
  
        <Button style={{
          marginTop:"-25px"
        }} type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
  
      </Spin>
      )}

    
    </div>
  );
};

export default LogoPage;
