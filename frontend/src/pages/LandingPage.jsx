import React from "react";
import style from "../styles/LandingPage.module.css";
import Button from "../components/General/Button";
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className={style.mainContainer}>
      <img
        className={style.logo}
        src="https://th.bing.com/th/id/OIP.nHB3f94fM0KpmCejJFRc3QHaH2?pid=ImgDet&rs=1"
        alt="logo"
      />
      <div className={style.mainIntroSection}>
        <div  className={style.intro}>
        <span><i>Hello, I'm</i></span>
        <i>
        <h1 datatext="Ellean">Ellean</h1>
        </i>
        </div>
        <div className={style.description}>
      I am here to help you and your teachers with the development of your dissertation. Together, we take the first steps towards guaranteed academic success
      </div>
      </div>
      
      <div className={style.buttonsZone}>
        <Link to="/login" className={style.link}>
          <Button className={style.btnType1} content={"Login"}></Button>
        </Link>
        <Link to="/register" className={style.link}>
          <Button className={style.btnType2} content={"Create Account"}></Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
