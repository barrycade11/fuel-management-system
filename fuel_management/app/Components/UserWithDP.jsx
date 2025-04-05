
const UserWithDP = ({ initials = "", name = "", firstname = "", lastname = "" }) => {

  const getInitials = (fName, lName) => {
    return `${fName.charAt(0)}${lName.charAt(0)}`
  }

  return (
    <div className="inline-block">
      <span className="inline-block w-8 h-8 leading-8 rounded-full bg-primary text-white text-center font-semibold">
        {getInitials(firstname, lastname)}
      </span>
      <span className="ml-2 text-md text-default-600 font-medium">{name}</span>
    </div>
  );
};

export default UserWithDP
