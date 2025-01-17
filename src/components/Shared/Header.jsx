/* eslint-disable react/prop-types */
const Header = ({ title, description }) => {
  return (
    <div className="text-center mt-2 mb-8">
      <h2 className="text-3xl font-bold">{title}</h2>

      <h5 className="font-light leading-snug tracking-normal text-slate-800 mx-auto mt-2 mb-6 w-full text-base max-w-sm lg:max-w-lg lg:text-xl">
        {description}
      </h5>
    </div>
  );
};

export default Header;
