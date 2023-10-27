import React from "react";

const SelectOpponentPage = () => {
    return ( 
        <div>
            <div>Select Opponent Page</div>

            <div>
                <p>opponent1</p>
                <button onClick={event => window.location.href='/game'}>About</button>
            </div>
        </div>
     );
}
 
export default SelectOpponentPage;