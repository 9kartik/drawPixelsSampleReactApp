
// const debounce = (fn) => {
//     let wait = false;
//     return (args) => {
//         if(wait)
//         {return;}
            
//         fn(args)
//         wait = true;

//         setTimeout(() => {
//                 wait=false
//         }, 1000);
//     }
// }

export const Screen = ({getClickPosition}: {getClickPosition: (e: React.MouseEvent | React.TouchEvent) => void}) =>{
    return <main onMouseMove={getClickPosition} onTouchMove={getClickPosition} style={{width:'100%',height:'1000px'}}></main>
}