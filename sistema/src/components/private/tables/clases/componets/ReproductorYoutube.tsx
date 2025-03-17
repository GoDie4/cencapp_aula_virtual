/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef, useEffect } from 'react'
import YouTube from 'react-youtube'

// Función para formatear los segundos a hh-mm-ss
const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const hh = h.toString().padStart(2, '0')
  const mm = m.toString().padStart(2, '0')
  const ss = s.toString().padStart(2, '0')

  return h > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`
}
const ReproductorYoutube = ({
  videoId,
  setFieldValue
}: {
  setFieldValue: any
  videoId: string | null
}): JSX.Element => {
  const [duration, setDuration] = useState<string | null>(null)
  const playerRef = useRef(null)

  const onReady = (event: any): void => {
    playerRef.current = event.target
    // @ts-expect-error
    const seconds = playerRef?.current?.getDuration()
    setDuration(formatTime(Number(seconds)))
  }

  useEffect(() => {
    if (duration) {
      setFieldValue('duracion', duration)
    }
  }, [duration])

  const opts = {
    height: '550',
    width: '100%',
    playerVars: {
      autoplay: 0
    }
  }

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  )
}

export default ReproductorYoutube
