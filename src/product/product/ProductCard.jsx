import HeaertIcon from '/ic_heart.png';

const ProductCard = ({ item }) => {
  return (
    <div className='item-card'>
      <img className='item-card-img' src={item.images[0]} alt={item.name} />
      <div className='item-card-info'>
        <h2 className='item-name'>{item.name}</h2>
        <p className='item-price'>{item.price.toLocaleString()}원</p>
        <div className='favorite'>
          <img src={HeaertIcon} alt="heart" />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
