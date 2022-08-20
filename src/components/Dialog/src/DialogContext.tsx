import { createContext, Context } from 'react'

export interface DialogContextState {
  fullscreen?: boolean
  setActive?: React.Dispatch<boolean>
}

const DialogContext: Context<DialogContextState> = createContext<DialogContextState>({
  fullscreen: false,
})

export default DialogContext
