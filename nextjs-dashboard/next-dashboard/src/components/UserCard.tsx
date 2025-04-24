import React from "react";

interface UserProps {
  name: string;
  email: string;
  phone: string;
}

const UserCard: React.FC<UserProps> = ({ name, email, phone }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
        <p className="card-text">{phone}</p>
      </div>
    </div>
  );
};

export default UserCard;
