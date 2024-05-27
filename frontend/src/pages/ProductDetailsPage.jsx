import { useEffect, useState } from 'react';
import ProductDetails from '../components/ProductDetails/ProductDetails'
import {useParams} from "react-router-dom"

const ProductDetailsPage = () => {
  const {id:productId} = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [product,setProduct]=useState()


  const fetchProduct = async () => {
    try {
     
      const response = await fetch(`${apiUrl}/api/products/${productId}`);

      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }

      const data = await response.json();
      setProduct(data)
      
     
    } catch (error) {
      console.log("Giriş hatası", error);
    } 
  };
  useEffect(()=> {
    fetchProduct()
   
  },[productId])
  return ( product ?
    <ProductDetails product={product} setProduct={setProduct}/> : <p>Ürün Yükleniyor</p>
  )
}

export default ProductDetailsPage