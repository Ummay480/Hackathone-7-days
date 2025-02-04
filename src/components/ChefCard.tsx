import React from "react";

interface ChefCardProps{
  image: string;
  name: string;
  position?: string; // Add this line
  experience: string;
  specialty: string;
  description: string;
  available: boolean;
}
const ChefCard: React.FC<ChefCardProps> = ({
  image,
  name,
  position,
  experience,
  specialty,
  description,
  available,
}) => {
  return (
    <div className="chef-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{position}</p>
      <p>Experience: {experience}</p>
      <p>Specialty: {specialty}</p>
      <p>{description}</p>
      <p>{available ? "Available" : "Not Available"}</p>
    </div>
  );
};

export default ChefCard;
