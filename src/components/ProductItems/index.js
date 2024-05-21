import "./index.css";
import share from '../../assets/share.svg';

const ProductItem = ({ item, index }) => {
  const handleShare = async (event) => {
    event.stopPropagation();

    try {
      const shareData = {
        title: `${item.title}`,
        text: `I found this amazing product from a unique, new-age brand on Furrl - ${item.title}`,
        url: `https://furrl.in/productDetail?id=${item.id}`,
      };

      await navigator.share(shareData);
    } catch (err) {
      console.error("Error sharing the product:", err);
    }
  };

  const handleRedirect = () => {
    window.location.href = `https://furrl.in/productDetail?id=${item.id}&ref=vibeResults_HomeHunts`;
  };

  return (
    <li
      onClick={handleRedirect}
      key={item.id}
      className={`product-item ${index % 5 === 2 ? "product-item-single" : ""}`}
    >
      <img
        loading="lazy"
        className={`product-image ${index % 5 === 2 ? "product-image-single" : ""}`}
        src={item.images[0].src}
        alt={item.title}
      />
      <div className="product-details">
        <img
          src={share}
          alt="Share"
          onClick={handleShare}
          className={`share-icon ${index % 5 === 2 ? "share-icon-single" : ""}`}
        />
        <p className="vendor-name">{item.brand[0].name}</p>
        <p className="vendor-name product-title">{item.title}</p>
        <p className="vendor-name product-title product-price">
          {`Rs. ${item.price.value}`}{" "}
          <span className="product-mrp">{`Rs. ${item.MRP.value}`}</span>
          <span className="product-discount">{`${item.discountPercent}%`}</span>
        </p>
      </div>
    </li>
  );
};

export default ProductItem;
