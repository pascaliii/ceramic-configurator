import cls from 'classnames'

const RadioOption = ({
  value,
  id,
  name,
  children,
  utilClassNames,
  ...restProps
}) => {
  const classNames = cls('radio__option', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <input
      className={classNames}
      {...restProps}
      type='radio'
      name={name}
      value={value}
      id={value}
    >
      {children}
    </input>
  )
}

export default RadioOption
