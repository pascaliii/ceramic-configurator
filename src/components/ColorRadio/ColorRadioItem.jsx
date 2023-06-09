import cls from 'classnames'

const ColorRadioItem = ({
  name,
  value,
  isChecked,
  image,
  alt,
  utilClassNames,
  onClick,
  ...restProps
}) => {
  const classNames = cls('color-radio__item', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames}>
      <label>
        <input
          type='radio'
          name={name}
          value={value}
          defaultChecked={isChecked}
          onClick={onClick}
        />
        <img className='color-radio__item-image' src={image} alt={alt} />
      </label>
    </div>
  )
}

export default ColorRadioItem
