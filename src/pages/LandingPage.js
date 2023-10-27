import React from "react";
import '../styles/landingpage.css';


const LandingPage = () => {
    return ( 
        <div>
            <button onClick={event => window.location.href='/selectopponent'}>Start</button>
            <button onClick={event => window.location.href='/about'}>About</button>
        </div>
     );
}
 
export default LandingPage;