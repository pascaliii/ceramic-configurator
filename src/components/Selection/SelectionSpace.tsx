import cls from 'classnames'

interface SelectionSpaceProps {
  utilClassNames?: string
}

const SelectionSpace = ({ utilClassNames }: SelectionSpaceProps) => {
  const classNames = cls('selection__space', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return <div className={classNames} />
}

export default SelectionSpace
