import React from "react";
import style from "../styles/LandingPage.module.css";
import Button from "../components/General/Button";
import CustomSidebar from "../components/Student/CustomSidebar";
function LandingPage() {
  return (
    <div className={style.mainContainer}>
      <CustomSidebar></CustomSidebar>

      <img
        className={style.logo}
        src="https://th.bing.com/th/id/OIP.nHB3f94fM0KpmCejJFRc3QHaH2?pid=ImgDet&rs=1"
        alt="logo"
      />
      <div className={style.mainIntroSection}>
        <div  className={style.intro}>
        <span><i>Hello, I'm</i></span>
        <i>
        <h1 datatext="Ellan">Ellan</h1>
        </i>
        </div>
        <div className={style.description}>
      I am here to help you and your teachers with the development of your dissertation. Together, we take the first steps towards guaranteed academic success
      </div>
      </div>
      
      <div className={style.buttonsZone}>
        <Button className={style.btnType1} content={"Login"}></Button>
        <Button className={style.btnType2} content={"Create Account"}></Button>
      </div>
    </div>
  );
}

export default LandingPage;
