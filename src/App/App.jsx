import React from "react";
import { Routers } from "../router/Routers";


export const App = () => {
  return (
    <div id ="app" className='wrapper'>
      <div id='container'>
        <Routers />
      </div>
    </div>
  );
};
