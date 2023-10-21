import cls from 'classnames'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'

const ColorRadioItem = ({ image, alt, utilClassNames, tooltip, ...restProps }) => {
  const classNames = cls('color-radio__item', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames} style={{pointerEvents: 'all'}}>
      <label>
        <input type='radio' {...restProps} />
        <Tippy content={tooltip}>
          <img className='color-radio__item-image' src={image} alt={alt} />
        </Tippy>
      </label>
    </div>
  )
}

export default ColorRadioItem
