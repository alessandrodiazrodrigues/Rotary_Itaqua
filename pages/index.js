'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar automaticamente para o Dashboard
    router.push('/Dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Redirecionando para o sistema...</p>
      </div>
    </div>
  );
}
