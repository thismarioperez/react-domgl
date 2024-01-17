import { Text } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import useSceneSize from '../hooks/useSceneSize'
import useSyncDomGl from '../hooks/useSyncDomGl'
import GlElement from './GlElement'

const GlText = ({ children, font }) => {
  const { scaleFactor } = useSceneSize()
  const ref = useRef<Text>(null)
  const text = children?.ref?.current

  // const shaderProps = useMemo(
  //   () => ({
  //     uniforms: {
  //       uColor: { value: new Color('pink') },
  //     },
  //     vertexShader,
  //     fragmentShader,
  //   }),
  //   []
  // )

  const [style, setStyle] = useState({})

  useSyncDomGl(ref.current, text)

  useEffect(() => {
    if (!text) return
    const s = getComputedStyle(text)

    const fontSize = parseFloat(s.fontSize)

    setStyle({
      fontSize: fontSize * scaleFactor.x,
      maxWidth: parseFloat(s.width) * scaleFactor.x,
      lineHeight:
        s.lineHeight === 'normal' ? 1.2 : parseFloat(s.lineHeight),
      fontWeight:
        { normal: 'nomal', bold: 'bold' }[s.fontWeight] ||
        parseFloat(s.fontWeight),
      color: s.color,
      fontStyle: s.fontStyle,
      textAlign: s.textAlign,
      fontFamily: s.fontFamily,
    })
  }, [text, scaleFactor])

  return (
    <>
      <GlElement>
        <Text
          ref={ref}
          {...style}
          // TODO: this might need to be adjustable per font
          anchorX={0.5}
          anchorY={-0.485}
          overflowWrap="break-word"
          font={font}
        >
          {text?.innerText}
          {/* <shaderMaterial {...shaderProps} /> */}
        </Text>
      </GlElement>

      {children}
    </>
  )
}

export default GlText
