import { useProgress } from '@react-three/drei'
import Button from './Button'

export const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress()
  return (
    <div
      className={`loading-screen ${started ? 'loading-screen--started' : ''}`}
    >
      <div className='loading-screen__wrapper'>
        <div className='loading-screen__progress'>
          <div
            className='loading-screen__progress-value'
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
        <div className='loading-screen__board'>
          <h1 className='loading-screen__title'>Ceramic Configurator</h1>
          <br />
          <p className='loading-screen__description'>
            This project is part of my master thesis in{' '}
            <strong>Digital Reality</strong> at{' '}
            <strong>University of Applied Sciences Hamburg </strong>. <br /> I
            used my technological knowledge to optimize the process of my hobby,
            which is pottery. This configurator helps me to decide which glazes
            would word with different shapes. I created PBR materials that are
            as close as possible to the common ceramic glazes from Botz and
            other Glaze companies.
            <br />
            <br />I hope this configurator is not only used by me, but also by
            other potters. <br />
            <br />
            <strong>Disclaimer</strong> <br /> Even though i tried my best to
            create realistic materials/glazes, the look of your final product
            may look different depending on the fire temperature and clay type.
            For now the materials represent glazes burned by 1250°C. <br />
            <br /> Have fun and try it out!
            <br />
            <br />
          </p>
          <Button
            label={progress < 100 ? 'Loading...' : 'Start Configuration'}
            disabled={progress < 100}
            loading={progress < 100}
            onClick={onStarted}
          />
        </div>
      </div>
    </div>
  )
}
export default LoadingScreen
