import { useState } from "react";

function Avatar({ name, src }: { name: string; src: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div>
        {name.split(' ').map(n => n[0]).join('')}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setError(true)}
    />
  );
}

export default Avatar;