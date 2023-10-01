import { useCallback, useEffect, useState } from 'react'
import { Screen, Dot } from './components'
import './App.css'
import { useUndoRedo } from './hooks/undo-redo';

interface Dot<T>{
  x: T;
  y: T;
}

// const debounce = (fn) => {
//   let wait = false;
//   return (args) => {
//       if(wait) return;
//       fn(args);
//       wait = true;
//       setTimeout(() => {
//               wait = false;
//       }, 2000);
//   }
// }

function App() {
  const [listOfPoints, setListOfPoints] = useState<Dot<number>[]>([]);
  const [redoList, setRedoList] = useState<typeof listOfPoints>([]);

  console.log('redraw');
  const mouseClickedHere = useCallback((e: React.MouseEvent) =>  {
    setListOfPoints(listOfPoints.concat({x:e.clientX,y:e.clientY}))
    setRedoList([]);
  }, [listOfPoints]);

  const undo = useCallback(() => {
    if(!listOfPoints.length)
      return
    setListOfPoints(listOfPoints.slice(0,-1)); // remove last drawn point from screen
    setRedoList(redoList.concat(listOfPoints.at(-1) as Dot<number>)) // push that in the redo stack
  }, [listOfPoints, redoList])
  
  const redo = useCallback(() => {
      if(!redoList.length)
        return;
      setRedoList(redoList.slice(0,-1)); // remove last drawn point from screen
      setListOfPoints(listOfPoints.concat(redoList.at(-1) as Dot<number>)); // push that in the redo stack
  },[listOfPoints, redoList])
  
  useUndoRedo({onUndo: undo, onRedo: redo})

  useEffect(() => {
    console.log('rendered')
    return () => console.log('unmounted')
  }, [])

  return (
    <>
      {listOfPoints.map(({x, y}, ind) => <Dot key={ind} size={Math.random() | 0} left={x} top={y}/>)}
      <button onClick={undo} disabled={!listOfPoints.length}>Undo</button>
      <button onClick={redo} disabled={!redoList.length}>Redo</button>
      {/* <main style={{width:'100%', height:'1000px'}} onClick={mouseClickedHere}></main> */}
      <Screen getClickPosition={mouseClickedHere} />
    </>
  )
}

export default App
