'use client';
import './Skeleton.scss';

export default function Skeleton({ width = '100%', height = '100%', borderRadius = '0.5rem' }) {
  return (
    <div 
      className="skeleton"
      style={{ width, height, borderRadius }}
    />
  );
}