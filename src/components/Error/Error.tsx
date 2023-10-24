import { useState } from 'react';
import css from './ErrorCSS.module.css';
import com from '../../commons/commonsCSS.module.css';
import error from '../../images/error.gif';
import loadingImage from '../../images/loadingImage.png';

function Error() {

  const [loaded, setLoaded] = useState<boolean>(false)

  return (
    <div className={css.background}>
      <div className={css.mainContainer}>
        <div>
          <img
            src={error}
            onLoad={() => setLoaded(true)}
            className={`${css.errorGif} ${com.noSelect}`}
            style={{ visibility: loaded ? 'visible' : 'hidden' }}
            alt=""
          />
          <img
            src={loadingImage}
            className={`${css.placeholderAnimation} ${com.noSelect}`}
            style={{ display: loaded ? 'none' : 'flex' }}
            alt=""
          />
        </div>
        <div className={`${css.message} ${com.noSelect}`}>
          This page does not exist.
        </div>
      </div>
    </div>
  )
}

export default Error;