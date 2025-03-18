/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

import c1 from '../../../assets/certificados/3.png'
import c2 from '../../../assets/certificados/4.png'

const Certificados2: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const handleOpenImage = (image: string): void => {
    setSelectedImage(image)
    setIsOpen(true)
  }

  const handleCloseImage = (): void => {
    setIsOpen(false)
  }

  return (
    <div style={{ position: 'relative', width: '80%', minWidth: '200px', margin: '0', height: '100%', marginTop: '50px' }}>
      <div
        className='img1'
        style={{
          position: 'absolute',
          top: '150px',
          left: '150px',
          width: '100%',
          maxWidth: '400px',
          height: 'fit-content',
          zIndex: 1
        }}
      >
        <motion.img
          src={c1.src}
          alt="Image 2"

          style={{
            width: '100%',
            height: 'fit-content',
            filter: 'drop-shadow(5px 6px 8px #00000071',

            objectFit: 'contain',
            rotate: '-8deg',
            y: '-10vh',
            cursor: 'pointer'
          }}

          whileHover={{ scale: 1.05 }}
          onClick={() => { handleOpenImage(`${c1.src}`) }}
        />
      </div>
      <div
        className='img2'
        style={{
          position: 'absolute',
          top: '-80px',
          left: '-80px',
          width: '100%',
          maxWidth: '400px',
          height: 'fit-content',
          zIndex: 0
        }}
      >
        <motion.img
          src={c2.src}
          alt="Image 1"
          style={{
            width: '100%',
            height: 'fit-content',
            objectFit: 'contain',
            filter: 'drop-shadow(5px 6px 8px #00000071',

            rotate: '-8deg',
            y: '10vh',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.05 }}
          onClick={() => { handleOpenImage(`${c2.src}`) }}
        />
      </div>

      {isOpen && (
        <motion.div
          style={{
            position: 'fixed',
            inset: '0',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100vw',
            maxHeight: '100vh',
            zIndex: 999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleCloseImage}
        >
          <img
            src={selectedImage}
            alt="Image"
            style={{ maxWidth: '80vw', maxHeight: '80vh' }}
          />
        </motion.div>
      )}
    </div>
  )
}

export default Certificados2
