import cls from 'classnames'

const ColorRadioItem = ({
  name,
  value,
  isChecked,
  image,
  alt,
  utilClassNames,
  ...restProps
}) => {
  const classNames = cls('color-radio__item', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames}>
      <label>
        <input type='radio' name={name} value={value} checked={isChecked} />
        <img className='color-box' src={image} alt={alt} />
      </label>
    </div>
  )
}

export default ColorRadioItem
