import { ApiRoutes } from "./Routes/ApiRoutes";
import { AppConsts } from "./Routes/AppConsts";

/* export default function Image({src,...rest}) {
    return (
      <img {...rest} src={src} alt={''} />
    );
  } */
  export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : AppConsts.ServerAddress + ApiRoutes.FileById.replace("{id}", src);
    return (
      <img {...rest} src={src} alt={''} />
    );
  }