'use client'
import { Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { IoClose } from 'react-icons/io5'

export interface DialogResponsiveContextType {
  open: boolean
  handleClickOpen: ({ title, content }: { title: string, content: React.ReactNode }) => void
  handleClose: () => void
}

export const DialogResponsiveContext = React.createContext<DialogResponsiveContextType>({
  open: false,
  handleClickOpen: () => {},
  handleClose: () => {},
})

export function DialogResponsiveProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState<React.ReactNode | null>(null)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'))

  const handleClickOpen = ({ title, content }: { title: string, content: React.ReactNode }) => {
    setOpen(true)
    setTitle(title)
    setContent(content)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <DialogResponsiveContext.Provider value={{ open, handleClickOpen, handleClose }}>
      {children}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          '.MuiDialog-paper': {
            backgroundColor: '#fff !important',
            width: '100% !important'
          }
        }}
      >
        <button
          title="Cerrar"
          onClick={handleClose}
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <IoClose size={25} color="black" />
        </button>
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </DialogResponsiveContext.Provider>
  )
}