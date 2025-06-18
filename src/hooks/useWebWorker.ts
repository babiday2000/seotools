import { useCallback, useRef, useEffect } from 'react';

interface WorkerMessage {
  type: string;
  data?: any;
  result?: any;
  error?: string;
}

export const useWebWorker = () => {
  const workerRef = useRef<Worker | null>(null);
  const callbacksRef = useRef<Map<string, (result: any) => void>>(new Map());

  useEffect(() => {
    // Initialize worker
    workerRef.current = new Worker('/worker.js');
    
    workerRef.current.onmessage = (e: MessageEvent<WorkerMessage>) => {
      const { type, result, error } = e.data;
      
      if (error) {
        console.error('Worker error:', error);
        return;
      }
      
      const callback = callbacksRef.current.get(type);
      if (callback) {
        callback(result);
        callbacksRef.current.delete(type);
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const processText = useCallback((text: string, operation: string, callback: (result: any) => void) => {
    if (!workerRef.current) return;
    
    callbacksRef.current.set('TEXT_PROCESSED', callback);
    workerRef.current.postMessage({
      type: 'PROCESS_TEXT',
      data: { text, operation }
    });
  }, []);

  const analyzeKeywords = useCallback((text: string, keywords: string[], callback: (result: any) => void) => {
    if (!workerRef.current) return;
    
    callbacksRef.current.set('KEYWORDS_ANALYZED', callback);
    workerRef.current.postMessage({
      type: 'ANALYZE_KEYWORDS',
      data: { text, keywords }
    });
  }, []);

  const compressData = useCallback((data: any, callback: (result: any) => void) => {
    if (!workerRef.current) return;
    
    callbacksRef.current.set('DATA_COMPRESSED', callback);
    workerRef.current.postMessage({
      type: 'COMPRESS_DATA',
      data
    });
  }, []);

  return {
    processText,
    analyzeKeywords,
    compressData,
    isWorkerSupported: typeof Worker !== 'undefined'
  };
};
