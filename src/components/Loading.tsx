import { AiOutlineLoading3Quarters } from 'react-icons/ai'
// import { logoPng } from '../context/images.context'

function Loading () {
  return (
    <div style={{
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      height: '100dvh',
      width: '100dvw'
    }}>
        <AiOutlineLoading3Quarters style={{ animation: 'spin 2s linear infinite', fontSize: 40 }} />
    </div>
  )
}

export default Loading
