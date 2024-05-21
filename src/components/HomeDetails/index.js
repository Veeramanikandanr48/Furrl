import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./index.css";
import CategoryFilters from "../../components/CategoryFilters";
import ProductItems from "../../components/ProductItems";
import LoadingSpinner from "../../components/Loader";

const initialProductState = {
  page: 0,
  pageSize: 0,
  totalPages: 10,
  totalProducts: 0,
  products: [],
};

const HomeDetails = () => {
  const [productData, setProductData] = useState(initialProductState);
  const [isLoading, setIsLoading] = useState(true);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
      if (!hasReachedEnd) setHasReachedEnd(true);
    }
  }, [hasReachedEnd]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (window.innerWidth > 768) {
      window.location.href = "https://info.furrl.in/";
    }
  }, []);

  const handleFilterChange = (filter) => {
    setProductData(initialProductState);
    setActiveFilter(filter);
    setHasReachedEnd(false);
  };

  const fetchProductData = useCallback(async () => {
    if (productData.page < productData.totalPages) {
      setIsLoading(true);

      const url = "https://api.furrl.in/api/v2/listing/getListingProducts";
      const requestBody = {
        input: {
          page: productData.page + 1,
          pageSize: 10,
          filters: activeFilter ? { id: activeFilter.uniqueId, type: activeFilter.contentType } : [],
          id: "#HomeHunts",
          entity: "vibe",
        },
      };

      try {
        const response = await axios.post(url, requestBody);
        const data = response.data;
        setProductData(prevData => ({
          ...data.data.getListingProducts,
          products: [...prevData.products, ...data.data.getListingProducts.products],
        }));
        setHasReachedEnd(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [productData, activeFilter]);

  const fetchFilterOptions = useCallback(async () => {
    const url = "https://api.furrl.in/api/v2/listing/getListingFilters";
    const requestBody = {
      id: "#HomeHunts",
      entity: "vibe",
    };

    try {
      const response = await axios.post(url, requestBody);
      const data = response.data;
      setFilterOptions(data.data.getListingFilters.easyFilters);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }, []);

  const renderProductItems = () => {
    return productData.products.map((product, index) => (
      <ProductItems key={product.id} item={product} index={index} />
    ));
  };

  useEffect(() => {
    if (hasReachedEnd) fetchProductData();
  }, [hasReachedEnd, fetchProductData]);

  useEffect(() => {
    fetchProductData();
  }, [activeFilter, fetchProductData]);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  return (
    <>
      <div className="banner">
        <h2 className="banner-heading">#HomeHunts</h2>
      </div>
      <div className="products-wrapper">
        <p className="title">
          Shop Products <span className="dot"></span>
          <span className="count">{productData.totalProducts} Products</span>
        </p>
        <ul className="filter-tabs">
          <li
            onClick={() => handleFilterChange(null)}
            className={`tab ${activeFilter === null ? "active-tab" : ""}`}
          >
            All
          </li>
          {filterOptions.map(option => (
            <CategoryFilters
              key={option.uniqueId}
              item={option}
              className="tab"
              activeFilter={activeFilter}
              activeFilterChanged={handleFilterChange}
            />
          ))}
        </ul>
      </div>
      <ul className="products-list">{renderProductItems()}</ul>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default HomeDetails;
