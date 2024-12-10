import React, { useEffect, useState } from 'react';
import './product.css';

const Product = () => {
    const [apiData, setApiData] = useState(null);
    const [searchData, setSearchData] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setApiData(json);
            });
    }, []);

    const handleCategoryFilter = (category) => {
        setCategoryFilter(prevCategory => prevCategory === category ? "" : category);
    };

    const getButtonClassName = (category) => {
        return `button-category ${categoryFilter === category ? "active" : ""}`;
    };

    const getButtonText = (category, defaultText) => {
        return categoryFilter === category ? `(${defaultText})` : defaultText;
    };

    return (
        <div className='main'>
            <div className='category'>
                <input className='input-bar' type="text" placeholder='Search' value={searchData} onChange={(e) => setSearchData(e.target.value)} />
                <button className={getButtonClassName("men's clothing")} onClick={() => handleCategoryFilter("men's clothing")}>
                    {getButtonText("men's clothing", "Men's Clothing")}
                </button>
                <button className={getButtonClassName("women's clothing")} onClick={() => handleCategoryFilter("women's clothing")}>
                    {getButtonText("women's clothing", "Women's Clothing")}
                </button>
                <button className={getButtonClassName("jewelery")} onClick={() => handleCategoryFilter("jewelery")}>
                    {getButtonText("jewelery", "Jewelery")}
                </button>
                <button className={getButtonClassName("electronics")} onClick={() => handleCategoryFilter("electronics")}>
                    {getButtonText("electronics", "Electronics")}
                </button>
            </div>
            <div className='list'>
                {apiData?.filter((filtered_value) => {
                    if (searchData === '' && categoryFilter === '') {
                        return filtered_value;
                    } else if (searchData !== '' && filtered_value?.title?.toLowerCase()?.includes(searchData?.toLowerCase())) {
                        return filtered_value;
                    } else if (categoryFilter !== '' && filtered_value?.category === categoryFilter) {
                        return filtered_value;
                    }
                }).map((data, index) => {
                    return (
                        <div key={data?.id} className='product-card'>
                            <div className='image-wrapper'>
                                <img src={data?.image} alt={data?.title} />
                            </div>
                            <div>
                                <h1 className='product-title'>{data?.title}</h1>
                                <div className='product-details'>
                                    <p className='product-category'>{data?.category}</p>
                                    <p className='product-price'>${data?.price}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Product;
