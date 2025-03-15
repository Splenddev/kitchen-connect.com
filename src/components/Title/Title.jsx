import './Title.css';

const Title = (prop) => {
  return (
    <div
      className="title-wrapper"
      id={prop.item}>
      <h2>{prop.title}</h2>
      <hr />
      <p>{prop.subTitle}</p>
    </div>
  );
};

export default Title;
