import cls from 'classnames'

const SelectionItem = ({ icon, children, utilClassNames, ...restProps }) => {
  const classNames = cls('selection__item', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <li className={classNames} {...restProps}>
       <svg ><use href={`/sprite.svg#${icon}`} xlinkHref={`/sprite.svg#${icon}`}></use></svg>
     {children}
    </li>
  )
}

export default SelectionItem
