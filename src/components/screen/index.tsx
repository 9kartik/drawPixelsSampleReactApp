
// import debounce from 'lodash/debounce';

import React from "react";
import {debounce} from 'lodash';
// const debounce = (fn) => {
//     let wait = false;
//     return (args) => {
//         if(wait) return;
//         fn(args);
//         wait = true;
//         setTimeout(() => {
//                 wait = false;
//         }, 2000);
//     }
// }

export const Screen = React.memo(({getClickPosition}: {getClickPosition: (e: React.MouseEvent) => void}) =>{
    return <main onMouseMove={debounce(getClickPosition)} style={{width:'100%',height:'1000px'}}></main>
})