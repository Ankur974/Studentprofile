import { useEffect, useRef } from "react";

const ImageWithFallback = ({ src, fallbackSrc, alt, ...props }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    const handleError = () => {
      if (imgRef.current) {
        imgRef.current.src = fallbackSrc;
      }
    };

    const imgElement = imgRef.current;
    imgElement.addEventListener("error", handleError);

    return () => {
      imgElement.removeEventListener("error", handleError);
    };
  }, [fallbackSrc]);

  return <img ref={imgRef} src={src ?? fallbackSrc} alt={alt} {...props} />;
};

export default ImageWithFallback;
