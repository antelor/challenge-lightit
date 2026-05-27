import { useState } from "react";

type Props = {
  name: string;
  src?: string;
  size?: number;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function Avatar({ name, src, size = 50 }: Props) {
  const initials = getInitials(name);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        color: '#374151',
        fontSize: size * 0.35,
        overflow: 'hidden',
      }}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          width={size}
          height={size}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div>{initials}</div>
      )}

    </div>
  );
}

export default Avatar;