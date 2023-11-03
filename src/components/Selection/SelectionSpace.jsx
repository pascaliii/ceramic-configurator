import cls from 'classnames'

const SelectionSpace = ({utilClassNames}) => {
  const classNames = cls('selection__space', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames} />
  )
}

export default SelectionSpace
