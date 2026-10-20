'use client';
import { useEffect } from 'react';

export function TrackVisit({ entryId }: { entryId: number }) {
  useEffect(() => {
    const record = () => {
      if (document.visibilityState !== 'visible') return;
      const url = new URL(window.location.href);
      const searched = url.searchParams.get('via') === 'pesquisa';
      if (searched) {
        url.searchParams.delete('via');
        window.history.replaceState(window.history.state, '', url);
      }
      void fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId, searched }),
        keepalive: true,
      }).catch(() => {});
      document.removeEventListener('visibilitychange', record);
    };
    if (document.visibilityState === 'visible') record();
    else document.addEventListener('visibilitychange', record);
    return () => document.removeEventListener('visibilitychange', record);
  }, [entryId]);
  return null;
}
