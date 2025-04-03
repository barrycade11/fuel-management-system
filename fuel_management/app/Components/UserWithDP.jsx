
const UserWithDP = ({ initials = "AF", name = "Feeney, Alice" }) => {

  return (
    <div className="inline-block">
      <span className="inline-block w-8 h-8 leading-8 rounded-full bg-primary text-white text-center font-semibold">
        {initials}
      </span>
      <span className="ml-2 text-md text-default-600 font-medium">{name}</span>
    </div>
  );
};

export default UserWithDP
