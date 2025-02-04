import React from "react";
import Image from "next/image";

interface ChefCardProps {
  image: string;
  name: string;
  position?: string;
  experience: string;
  specialty: string;
  description: string;
  available: boolean;
}

const ChefCard: React.FC<ChefCardProps> = ({
  image,
  name,
  position = "Position not specified",
  experience,
  specialty,
  description,
  available,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="rounded-full mx-auto"
      />
      <h2 className="text-xl font-bold text-center mt-2">{name}</h2>
      <p className="text-gray-600 text-center">{position}</p>
      <p className="text-gray-500 text-center">Experience: {experience}</p>
      <p className="text-gray-500 text-center">Specialty: {specialty}</p>
      <p className="text-gray-500 text-center mt-2">{description}</p>
      <p className={`text-center mt-2 ${available ? "text-green-600" : "text-red-600"}`}>
        {available ? "Available" : "Not Available"}
      </p>
    </div>
  );
};

export default ChefCard;
