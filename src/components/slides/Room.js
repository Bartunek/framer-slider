import React, { Suspense, useState, useEffect } from 'react'
import { Canvas, useLoader, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { transform } from 'framer-motion'

import { useWindowSize } from '../../hooks/use-window-size'
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll'

function Throbber () {
  useLockBodyScroll()
  return (
    <mesh position-y={1}>
      <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

function Table({ innerRef }) {
  const table = useLoader(GLTFLoader, '/models/chair/kitchen-table.gltf')
  return <primitive ref={innerRef} object={table.scene} position={[0, 40, -0.5]} scale={[1.5, 1.5, 1.5]} dispose={null} />
}

function Couch({ innerRef }) {
  const table = useLoader(GLTFLoader, '/models/couch/couch.gltf')
  return <primitive ref={innerRef} object={table.scene} position={[0, 40, -3]} scale={[2, 2, 2]} dispose={null} />
}

function Scene({ progress, ready }) {
  const { width } = useWindowSize()
  const { camera, invalidate } = useThree()

  const [table, setTable] = useState(null)
  const [couch, setCouch] = useState(null)

  useEffect(() => {
    if (!progress || !camera) return

    function updateActiveItem(progressValue) {
      camera.position.y = 40 - (20 / 100 * progressValue)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()

      if (table) table.position.y = transform(progressValue, [0, 20, 40, 100], [40, 40, 0, 0])
      if (couch) couch.position.y = transform(progressValue, [0, 40, 60, 100], [40, 40, 0, 0])
      invalidate()
    }

    const unsubscribeItem = progress.onChange(updateActiveItem)

    return () => {
      unsubscribeItem()
    }
  }, [progress, width, camera, table, couch, invalidate])

  return (
    <>
      {(!table || !couch) && <Throbber />}
      {/* <gridHelper args={[100, 10, 0x666666, 0x666666]} /> */}
      <spotLight args={[0xffffff, 1.5, 0, Math.PI / 6, 0.25]} position={[0, 20, 5]} />
      <mesh>
        <boxGeometry attach="geometry" args={[10, 0.1, 10, 1, 1]}></boxGeometry>
        <meshPhongMaterial attach="material" color="#888"></meshPhongMaterial>
      </mesh>
      <mesh position={[0, 5, -5]}>
        <boxGeometry attach="geometry" args={[10, 10, 0.1, 1, 1]}></boxGeometry>
        <meshPhongMaterial attach="material" color="#888"></meshPhongMaterial>
      </mesh>
      <mesh position={[-5, 5, 0]}>
        <boxGeometry attach="geometry" args={[0.1, 10, 10, 1, 1]}></boxGeometry>
        <meshPhongMaterial attach="material" color="#888"></meshPhongMaterial>
      </mesh>
      <Suspense fallback={null}>
        <Table innerRef={setTable} />
        <Couch innerRef={setCouch} />
      </Suspense>
    </>
  )
}

export function Room({ progress }) {
  return (
    <Canvas
      camera={{ position: [20, 40, 20], fov: 45 }}
      invalidateFrameloop
    >
      <Scene progress={progress} />
    </Canvas>
  )
}
