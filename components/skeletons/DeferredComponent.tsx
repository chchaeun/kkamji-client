import React, { PropsWithChildren, useEffect, useState } from "react";

function DeferredComponent({ children }: PropsWithChildren) {
  const [isDeferred, setIsDeferred] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
}

export default DeferredComponent;
