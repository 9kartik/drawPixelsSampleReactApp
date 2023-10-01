import {appendPixelToString} from '../../utils/stringMethods';

export const Dot = ({size = 10, left,top} :{size: number;left:number;top:number}) =>{
    return <div className="resizer" style={{position:'absolute',
                        width:appendPixelToString(size),
                        height:appendPixelToString(size),
                        left:appendPixelToString(left),
                        top:appendPixelToString(top),
                        translate: '-50% -50%',
                        background: '#FFF',
                        borderRadius: '50%'
                        }}>
            </div>
}