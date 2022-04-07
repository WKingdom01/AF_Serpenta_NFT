

const GrayFrame = ({title, children}) => (
  <section className="grayframe component">
      <div className="grayframe__title">
          {title}
      </div>
      <div className="grayframe__content">
        {children}
        
        </div>
  </section>
)

export default GrayFrame