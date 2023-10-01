import { useEffect } from "react";

export const useUndoRedo = ({onUndo, onRedo}: {onUndo: () => void;onRedo:  () => void}) => {
    useEffect(() => {
        const onPress = (e: KeyboardEvent) =>{
          if(!e.metaKey)
            return;
          if(e.code !== 'KeyZ')
            return;
          if(e.shiftKey)
          {
            onRedo();
            return;
          }
          onUndo();
          return;
        };
        document.addEventListener('keydown', onPress)
        return () => {
          document.removeEventListener('keydown', onPress)
        }
      }, [onUndo, onRedo])
}