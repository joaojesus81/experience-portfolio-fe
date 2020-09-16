import React from "react";
import UserInfo from "../models/UserInfo";

const user = UserInfo.create({
  name: "Alex",
  profession: "Engineer",
  currentPosition: "Engineer",
  joinedArup: "09/09/2014",
  yearsOfExperience: 6,
  qualifications: "MEng",
  languages: "English",
  publications: "None",
});

const ProfInfo = () => {
  return (
    <section className="profInfo">
      <h3> Professional Info </h3>
      <h5> Profession: </h5> <p> {user.profession}</p>
      <h5> Current Position: </h5>
      <p> {user.currentPosition}</p>
      <h5> Joined Arup: </h5>
      <p> {user.joinedArup}</p>
      <h5> Years of experience: </h5>
      <p> {user.yearsOfExperience}</p>
      <h5> Qualifications: </h5>
      <ul className="profInfoList">
        <li> MEng Civil Engineering</li>
        <li>PhD Computational Hydraulics</li>
      </ul>
      <h5> Languages: </h5>
      <ul className="profInfoList">
        <li>English</li>
        <li>Cantonese</li>
      </ul>
      <h5> Publications: </h5>
      <ul className="profInfoList">
        <li>Article 1</li>
        <li>Article 2</li>
      </ul>
      <button>Update Professional Info!</button>
    </section>
  );
};

export default ProfInfo;
