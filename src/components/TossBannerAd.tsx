import { useEffect, useRef, useState } from 'react';
import { TossAds } from '@apps-in-toss/web-framework';
import { AD_CONFIG } from '../constants/adConfig';

interface TossBannerAdProps {
  adGroupId: string;
  height?: string;
  variant?: 'card' | 'expanded';
}

export const TossBannerAd: React.FC<TossBannerAdProps> = ({
  adGroupId,
  height,
  variant = 'expanded',
}) => {
  let resolvedHeight = height;
  if (!resolvedHeight) {
    if (variant === 'expanded') resolvedHeight = '96px';
    else if (adGroupId === AD_CONFIG.NATIVE_IMAGE) resolvedHeight = '410px';
    else resolvedHeight = '180px';
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const isTossApp = /Toss/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isTossApp) return;
    const globalAds = TossAds as any;
    try {
      if (globalAds.initialize?.isSupported?.() || globalAds.initialize) {
        globalAds.initialize({
          callbacks: {
            onInitialized: () => setIsInitialized(true),
            onInitializationFailed: () => setIsInitialized(true),
          },
        });
      } else {
        setIsInitialized(true);
      }
    } catch {
      setIsInitialized(true);
    }
  }, [isTossApp]);

  useEffect(() => {
    if (!isTossApp || !isInitialized || !containerRef.current) return;
    let banner: { destroy: () => void } | undefined;
    const globalAds = TossAds as any;
    const attachFn = globalAds.attachBanner || globalAds.attach;
    try {
      banner = attachFn?.(adGroupId, containerRef.current, { variant, theme: 'light' });
    } catch {
      // 배너 부착 실패 시 무시
    }
    return () => {
      if (banner && typeof banner.destroy === 'function') {
        banner.destroy();
      } else {
        globalAds.destroyAll?.();
      }
    };
  }, [adGroupId, variant, isInitialized, isTossApp]);

  return (
    <div style={{ width: '100%', minHeight: resolvedHeight, background: 'transparent' }}>
      {isTossApp && <div ref={containerRef} style={{ width: '100%' }} />}
      {!isTossApp && (
        <div
          style={{
            height: resolvedHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed rgba(255,255,255,0.3)',
            background: 'rgba(0,0,0,0.15)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '12px',
          }}
        >
          [Mock] 배너 광고 영역
        </div>
      )}
    </div>
  );
};
