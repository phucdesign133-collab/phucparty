import React from "react";
import "../components/Resources.css";
import { resourcesData } from "../datas/resoucesData";
import BackgroundText from "../components/backgroundText";
import SliderSection from "../components/SliderSection"; // Import component con

const Resources = () => {
  return (
    <div className="resources-page">
      <BackgroundText category="resources"/> {/* Text nền đã khôi phục */}
      
      {resourcesData.map((group, index) => (
        <SliderSection 
          key={index} 
          title={group.category} 
          tools={group.tools} 
        />
      ))}
    </div>
  );
};

export default Resources;