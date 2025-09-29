import React, { useState } from "react";


export function useToggle (){
    const [passwordVisibility , setVisibility] = useState(false);


    const toggle = ()=> setVisibility(!passwordVisibility);

    return [passwordVisibility , toggle];
}
