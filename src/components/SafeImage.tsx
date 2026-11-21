import {useLayoutEffect, useRef, useState} from 'react';
import {Coffee} from 'lucide-react';
import {NOIRE_IMAGE_META} from '../data/noireData';

export type SafeImageSurface = 'green' | 'amber' | 'light' | 'transparent';

interface SafeImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
  fallbackTitle?: string;
  compactFallback?: boolean;
  surface?: SafeImageSurface;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

type ImageStatus = 'loading' | 'loaded' | 'error';

const SHIMMER_CLASSES: Record<Exclude<SafeImageSurface, 'transparent'>, string> = {
  green: 'noire-shimmer-green',
  amber: 'noire-shimmer-amber',
  light: 'noire-shimmer-light',
};

const FALLBACK_CLASSES: Record<SafeImageSurface, string> = {
  green: 'bg-[#1e321e] text-[#FFA929] border border-[#FFFFFF]/10',
  amber: 'bg-[#152615]/14 text-[#152615] border border-[#152615]/15',
  light: 'bg-[#152615]/8 text-[#152615] border border-[#152615]/12',
  transparent:
    'aspect-[586/760] rounded-[6px] bg-[#1e321e]/95 text-[#FFA929] border border-[#FFA929]/30',
};

export function SafeImage({
  src,
  alt,
  srcSet,
  sizes,
  width,
  height,
  className = '',
  wrapperClassName = 'w-full h-full',
  fallbackTitle,
  compactFallback = false,
  surface = 'green',
  loading = 'lazy',
  decoding,
  fetchPriority,
}: SafeImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [statusState, setStatusState] = useState<{src: string; status: ImageStatus}>({
    src,
    status: 'loading',
  });

  const status: ImageStatus = statusState.src === src ? statusState.status : 'loading';

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setStatusState({src, status: 'loaded'});
    } else {
      setStatusState({src, status: 'loading'});
    }
  }, [src]);

  const meta = NOIRE_IMAGE_META[src];
  const resolvedSrcSet = srcSet ?? meta?.srcSet;
  const resolvedWidth = width ?? meta?.width;
  const resolvedHeight = height ?? meta?.height;
  const resolvedDecoding = decoding ?? (loading === 'eager' ? 'sync' : 'async');

  if (status === 'error') {
    const captionColor =
      surface === 'amber' || surface === 'light' ? 'text-[#152615]/65' : 'text-[#FFFFFF]/60';
    const titleColor =
      surface === 'amber' || surface === 'light' ? 'text-[#152615]' : 'text-[#FFFFFF]/85';

    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center text-center ${
          compactFallback ? 'p-1.5' : 'p-4'
        } ${wrapperClassName} ${FALLBACK_CLASSES[surface]}`}
      >
        <Coffee
          className={compactFallback ? 'w-4 h-4 opacity-70' : 'w-6 h-6 opacity-75 mb-2'}
          aria-hidden="true"
        />
        {!compactFallback && fallbackTitle && (
          <span className={`font-display text-xs font-semibold tracking-wide ${titleColor}`}>
            {fallbackTitle}
          </span>
        )}
        {!compactFallback && (
          <span className={`mt-1 text-[10px] uppercase tracking-[0.12em] ${captionColor}`}>
            Image unavailable
          </span>
        )}
      </div>
    );
  }

  const showShimmer = surface !== 'transparent';

  return (
    <div
      className={`relative ${
        surface === 'transparent' ? '' : 'overflow-hidden'
      } ${wrapperClassName}`}
    >
      {showShimmer && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 noire-image-fade ${
            SHIMMER_CLASSES[surface]
          } ${status === 'loaded' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />
      )}

      <span
        className={`block w-full h-full noire-image-fade ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          ref={imgRef}
          src={src}
          srcSet={resolvedSrcSet}
          sizes={sizes}
          width={resolvedWidth}
          height={resolvedHeight}
          alt={alt}
          loading={loading}
          decoding={resolvedDecoding}
          fetchPriority={fetchPriority}
          referrerPolicy="no-referrer"
          onLoad={() => setStatusState({src, status: 'loaded'})}
          onError={() => setStatusState({src, status: 'error'})}
          className={className}
        />
      </span>
    </div>
  );
}
