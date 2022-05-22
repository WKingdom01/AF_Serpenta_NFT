import Image from 'next/image'
import { Parallax } from 'react-parallax';

const Background = ({ top, bottom }) => (
  <Parallax bgImage="starrybg.png" className="background">
    {/* <div className="background__image">
      <Image
        alt="background"
        src="/starrybg.png"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        
      />
      </div> */}
    <div className="background__container">
      <div className="container">{top}</div>
      <div className="background__logo">
        <Image
          alt="Logo"
          src="/logo.png"
          layout="intrinsic"
          width="2720"
          height="800"
          quality={100}
          priority
        />
      </div>
      <div>{bottom}</div>
    </div>
  </Parallax >
)

export default Background