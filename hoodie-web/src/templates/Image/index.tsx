import { forwardRef, useState, type ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ style, src, alt, ...props }, ref) => {
    const [fallback, setFallback] = useState<string>("");

    const handleError = () => {
      setFallback("https://www.secondmedic.com/app/asset/consult/img/noimage.jpg");
    };

    return (
      <img
        style={{ overflow: "hidden", cursor: "pointer", ...style }}
        src={fallback || src}
        ref={ref}
        alt={alt}
        onError={handleError}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;