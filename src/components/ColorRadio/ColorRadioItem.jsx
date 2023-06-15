import cls from 'classnames'

const ColorRadioItem = ({ image, alt, utilClassNames, ...restProps }) => {
  const classNames = cls('color-radio__item', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames}>
      <label>
        <input type='radio' {...restProps} />
        <img className='color-radio__item-image' src={image} alt={alt} />
      </label>
    </div>
  )
}

export default ColorRadioItem
