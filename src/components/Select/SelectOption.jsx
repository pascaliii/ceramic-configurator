import cls from 'classnames'

const SelectOption = ({ value, children, utilClassNames, ...restProps }) => {
  const classNames = cls('select__option', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <option value={value} className={classNames} {...restProps}>
      {children}
    </option>
  )
}

export default SelectOption
