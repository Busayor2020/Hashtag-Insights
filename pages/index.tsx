import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/insights/uri');
  }, [router]);

  return <div>Uri data is loading...</div>;
}