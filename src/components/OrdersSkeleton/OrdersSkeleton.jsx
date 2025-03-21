import Skeleton from '../Skeleton/Skeleton';
import './OrdersSkeleton.css';

const OrdersSkeleton = () => {
  return (
    <div className="orders-skeletons">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="orders-skeleton">
          <div className="orders-skeleton-flex">
            <Skeleton
              width={'100%'}
              borderRadius={'5px'}
              height={'30px'}
            />
            <Skeleton
              width={'20%'}
              borderRadius={'30px'}
              height={'30px'}
            />
          </div>
          <div className="orders-skeleton-flex middle">
            <Skeleton
              width={'100%'}
              borderRadius={'10px'}
              height={'150px'}
            />
            <Skeleton
              width={'100%'}
              borderRadius={'10px'}
              height={'150px'}
            />
          </div>
          <div className="orders-skeleton-flex">
            <Skeleton
              width={'100%'}
              borderRadius={'10px'}
              height={'50px'}
            />
            <Skeleton
              width={'30%'}
              borderRadius={'10px'}
              height={'50px'}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersSkeleton;
