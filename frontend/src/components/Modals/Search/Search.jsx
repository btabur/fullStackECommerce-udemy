import React, { useState } from 'react'
import './Search.css'
import PropTypes from 'prop-types'
import { message } from "antd";

const Search = ({isSearchShow, setIsSearchShow}) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [searchResults,setSearchResults]= useState([])
    const handleSearch = async (e)=> {
        e.preventDefault();
        const productName = e.target[0].value;

        if(productName.trim().length==0) {
            message.info("Boş karakter arayamazsınız")
            return;
        }

        try {
            const res =  await fetch(`${apiUrl}/api/products/search/${productName.trim()}`);
            if(!res.ok){
              message.error("Ürün getirilemedi") 
              return;
            }

            const data = await res.json();
            setSearchResults(data)
        } catch (error) {
            console.log(error);
        }

    }
  return (
    <div className= {`modal-search ${isSearchShow ? "show" : ""}` }>
    <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">Start typing to see products you are looking for.</p>
        <form className="search-form" onSubmit={handleSearch}>
            <input type="text" placeholder="Search a product"/>
            <button>
                <i className="bi bi-search"></i>
            </button>
        </form>
        <div className="search-results">
            <div className="search-heading">
                <h3>RESULTS FROM PRODUCT</h3>
            </div>
            <div className="results" style={{
                display:`${searchResults?.length === 0 ? "flex" : "grid"}`
            }}>
                {searchResults?.length ===0 && (
                    <a href="#" className='result-item' 
                    style={{justifyContent:"center",
                            width:"100%"
                    }}>
                        Aradığınız ürün bulunamadı 
                    </a>
                )}
                {searchResults.length>0 && 
                searchResults?.map(resultItem=> (
                        <a href="#" className="result-item" key={resultItem._id}>
                        <img src={resultItem.img[0]} className="search-thumb" alt=""/>
                        <div className="search-info">
                            <h4>{resultItem.name}</h4>
                            <span className="search-sku">SKU: PD0016</span>
                            <span className="search-price">${resultItem.price.current.toFixed()}</span>
                        </div>
                        </a>
                        )
                )}
               
             
            </div>
        </div>
        <i className="bi bi-x-circle" id="close-search" 
        onClick={()=>setIsSearchShow(false)}
        ></i>
    </div>
    <div className="modal-overlay" onClick={()=>setIsSearchShow(false)}></div>
</div>
  )
}

export default Search

Search.protoTypes = {
    isSearchShow:PropTypes.bool,
    setIsSearchShow:PropTypes.func
}