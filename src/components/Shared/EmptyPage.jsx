/* eslint-disable react/prop-types */
const EmptyPage = ({ message }) => {
  return (
    <div className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
      <img
        src="https://i.ibb.co/m5DrBt1/Group-2.png"
        alt="empty/image"
        className="w-[200px]"
      />

      <h1 className="text-[1.4rem] mt-6 font-[500] text-black">{message}</h1>
    </div>
  );
};

export default EmptyPage;
