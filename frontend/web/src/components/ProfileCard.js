import React from "react";
import { Linkedin, Instagram } from "../assets";

function ProfileCard({image, name, position, instagram, linkedin }) {
    return (
      <div>
        <img src={image} className="h-30"></img>
            <p className="text-xl font-bold text-[#414141] mt-2">{name}</p>
            <p className="text-lg text-[#414141] mt-0">{position}</p>
        <div className="grid grid-cols-9 mt-0">
          <img src={Linkedin} className="mt-1"></img>
          <img src={Instagram}></img>
        </div>
      </div>
  );
}

export default ProfileCard;
