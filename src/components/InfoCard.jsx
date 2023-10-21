import cls from 'classnames'

const InfoCard = ({
  label,
  temperature, 
  
  utilClassNames,
  ...restProps
}) => {
  const classNames = cls('info-card', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames} {...restProps}>
      {label}
    </div>
  )
}

export default InfoCard
