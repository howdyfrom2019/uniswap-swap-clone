import React from "react";

export default function MockNextImage({ src, alt, ...props }) {
  return <img src={src} alt={alt} {...props} />;
}
