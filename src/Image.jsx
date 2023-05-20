/* export default function Image({src,...rest}) {
    return (
      <img {...rest} src={src} alt={''} />
    );
  } */
  export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://localhost:5000/file/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }