import Image from "next/dist/client/image";
import { useState } from "react";

import cls from "classnames";
import { motion } from "framer-motion";

import styles from "./card.module.css";

const Card = (props) => {

  const { 
    imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', 
    size = 'medium',
    id } = props;
  
  const classMap= {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  }
  
  const [imgSrc, setImgSrc] = useState(imgUrl)
  const handleOnError = () => {
    console.log('error handler');
    setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')
  };

  const scale = id === 0 ? { scaleY:1.1 } : {
    scale:1.1
  };

  return (
    <div className={styles.container}>
      <motion.div className={cls(styles.imgMotionWrapper, 
      classMap[size])}
      whileHover={{ ...scale }}>
        <Image 
        src={imgSrc} 
        alt="Image" 
        layout="fill"
        onError={handleOnError}
        className={styles.cardImg} />
      </motion.div>
    </div>
  )
};


export default Card;