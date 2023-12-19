import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons'

const ImageWithFallback = ({ src, icon, rounded }: any) => {
  const [imageExists, setImageExists] = useState<boolean>(false);

  useEffect(() => {
    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;  
      }
    }

    if (isValidUrl(src)) {
      fetch(src)
        .then((res) => {
          if (res.ok) {
            setImageExists(true);
          } else {
            setImageExists(false);
          }
        })
        .catch(() => setImageExists(false))
    } else {
      setImageExists(false);
    }
  }, [src])

  return imageExists ? (
    <img src={src} className={`w-full ${rounded ? 'rounded-'+rounded : 'rounded-lg'} aspect-square object-cover`} />
  ) : (
    <div className={`flex w-full bg-gray-800 aspect-square items-center justify-center ${rounded ? 'rounded-'+rounded : 'rounded-lg'} border border-gray-700 object-cover`}><FontAwesomeIcon icon={icon || faImage} className='text-2xl'/></div>
  )
}

export default ImageWithFallback
