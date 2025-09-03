'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFoundRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
};

export default NotFoundRedirect;
