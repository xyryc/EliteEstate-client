/* eslint-disable react/prop-types */
const Header = ({ title, description }) => {
  return (
    <div className="text-center mt-2 mb-8">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="">{description}</p>
    </div>
  );
};

export default Header;
