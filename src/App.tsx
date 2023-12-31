import { useCallback, useState } from 'react'
import { Screen, Dot } from './components'
import './App.css'
import { useUndoRedo } from './hooks/undo-redo';
import { memoisedDesktopCheck } from './utils/detectDesktop';

interface Dot<T>{
  x: T;
  y: T;
}

function App() {
  const [listOfPoints, setListOfPoints] = useState<Dot<number>[]>([]);
  const [redoList, setRedoList] = useState<typeof listOfPoints>([]);

  console.log('redraw');
  const mouseClickedHere = useCallback((e: React.MouseEvent | React.TouchEvent) =>  {
    if(e.type === 'mousemove')
      {setListOfPoints(listOfPoints.concat({x:(e as React.MouseEvent).clientX,y:(e as React.MouseEvent).clientY}))}
    if(e.type === 'touchmove')
      { [...(e as React.TouchEvent).nativeEvent.changedTouches].forEach((touch) => {
        setListOfPoints(points => points.concat({x:touch.clientX,y: touch.clientY}))
      })}
    setRedoList([]);
  }, [listOfPoints]);

  const undo = useCallback(() => {
    if(!listOfPoints.length)
      return
    setListOfPoints(listOfPoints.slice(0,-1)); // remove last drawn point from screen
    setRedoList(redoList.concat(listOfPoints.at(-1) as (typeof listOfPoints)[number])) // push that in the redo stack
  }, [listOfPoints, redoList])
  
  const redo = useCallback(() => {
      if(!redoList.length)
        return;
      setRedoList(redoList.slice(0,-1)); // remove last drawn point from screen
      setListOfPoints(listOfPoints.concat(redoList.at(-1) as (typeof redoList)[number])); // push that in the redo stack
  },[listOfPoints, redoList])
  
  useUndoRedo({onUndo: undo, onRedo: redo})

  return (
    <>
      {listOfPoints.map(({x, y}, ind) => <Dot key={ind} size={Math.random() | 0} left={x} top={y}/>)}
      <button onClick={undo} disabled={!listOfPoints.length}>Undo</button>
      <button onClick={redo} disabled={!redoList.length}>Redo</button>
      {memoisedDesktopCheck() && <span> Press command+z for undo, command+shift+z for redo </span>}
      <Screen getClickPosition={mouseClickedHere} />
    </>
  )
}

export default App
