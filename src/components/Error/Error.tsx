import { useState } from 'react';
import css from './ErrorCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import { useSelector } from 'react-redux';
import error from '../../images/error.gif';
import loadingImage from '../../images/loadingImage.png';

function Error() {

  const viewPort = useSelector((state: {viewPort: string}) => state.viewPort)

  const [loaded, setLoaded] = useState<boolean>(false)

  return (
    <div className={css.background} style={{ minHeight: (viewPort === 'smaPort' || viewPort === 'smaLand') ? 'none' : '550px' }}>
      <div className={css.leftRightHelper} style={{ minWidth: (viewPort === 'smaPort' || viewPort === 'smaLand') ? 'none' : '30px' }} />
      <div className={css.mainContainer} style={{ width: viewPort === 'smaPort' ? '90vw' : viewPort === 'smaLand' ? '40vw' : (viewPort === 'medPort' || viewPort === 'medLand') ? '430px' : '500px' }}>
        <div>
          <img
            src={error}
            onLoad={() => setLoaded(true)}
            style={{
              visibility: loaded ? 'visible' : 'hidden',
              width: viewPort === 'smaPort' ? '65vw' : viewPort === 'smaLand' ? '50vh' : (viewPort === 'medPort' || viewPort === 'medLand') ? '300px' : '400px',
              height: viewPort === 'smaPort' ? '65vw' : viewPort === 'smaLand' ? '50vh' : (viewPort === 'medPort' || viewPort === 'medLand') ? '300px' : '400px',
            }}
            className={`${css.errorGif} ${com.noSelect}`}
            alt=""
          />
          <img
            src={loadingImage}
            style={{
              display: loaded ? 'none' : 'flex',
              marginTop: viewPort === 'smaPort' ? '-65vw' : viewPort === 'smaLand' ? '-50vh' : (viewPort === 'medPort' || viewPort === 'medLand') ? '-300px' : '-400px',
              width: viewPort === 'smaPort' ? '65vw' : viewPort === 'smaLand' ? '50vh' : (viewPort === 'medPort' || viewPort === 'medLand') ? '300px' : '400px',
              height: viewPort === 'smaPort' ? '65vw' : viewPort === 'smaLand' ? '50vh' : (viewPort === 'medPort' || viewPort === 'medLand') ? '300px' : '400px'
            }}
            className={`${css.placeholderAnimation} ${com.noSelect}`}
            alt=""
          />
        </div>
        <div className={`${css.message} ${com.noSelect}`} style={{ fontSize: viewPort === 'smaPort' ? '7vw' : viewPort === 'smaLand' ? '5.5vh' : (viewPort === 'medPort' || viewPort === 'medLand') ? '31px' : '35px' }} >
          This page does not exist.
        </div>
      </div>
      <div className={css.leftRightHelper} style={{ minWidth: (viewPort === 'smaPort' || viewPort === 'smaLand') ? 'none' : '30px' }} />
    </div>
  )
}

export default Error;