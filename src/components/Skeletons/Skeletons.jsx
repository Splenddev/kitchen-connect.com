import Skeleton from '../Skeleton/Skeleton';
import './Skeletons.css';

const Skeletons = () => {
  return (
    <div className="skeletons">
      {[...Array(8)].map((_, index) => (
        <div
          className="skeleton"
          key={index}>
          <Skeleton
            width={'100%'}
            borderRadius={'10px'}
            height={200}
          />
          <div className="skeleton-flex">
            <Skeleton
              width={'100%'}
              borderRadius={'10px'}
              height={'30px'}
            />
            <Skeleton
              width={'30px'}
              borderRadius={'50%'}
              height={'30px'}
            />
          </div>
          <hr />
          <div className="skeleton-flex">
            <Skeleton
              width={'100%'}
              borderRadius={'10px'}
              height={'60px'}
            />
          </div>
          <hr />
          <div className="skeleton-flex">
            <Skeleton
              width={'100%'}
              borderRadius={'10px'}
              height={'30px'}
            />
            <Skeleton
              width={'20%'}
              borderRadius={'10px'}
              height={'30px'}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeletons;
