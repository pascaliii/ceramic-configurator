import cls from 'classnames'

const Input = ({
  type = 'text',
  placeholder,
  utilClassNames,
  ...restProps
}) => {
  const classNames = cls('input', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <input
      className={classNames}
      {...restProps}
      type={type}
      placeholder={placeholder}
    />
  )
}

export default Input
