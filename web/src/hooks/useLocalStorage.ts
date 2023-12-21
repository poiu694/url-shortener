import { useState } from 'react';

/**
 * 주어진 키와 초기값을 사용하여 로컬스토리지에 아이템을 가져오는 함수입니다.
 *
 * @template T - 초기값의 타입
 * @param {string} key - 로컬스토리지에서 아이템을 가져오기 위한 키
 * @param {T} initialValue - 아이템이 존재하지 않을 때 사용될 초기값
 * @returns {T} - 로컬스토리지에 저장된 아이템 또는 초기값
 */
function getItem<T>(key: string, initialValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValue;
  } catch (error) {
    return initialValue;
  }
}

/**
 * 주어진 키와 초기값을 사용하여 로컬스토리지와 상태를 동기화하는 커스텀 훅입니다.
 *
 * @template T - 상태의 타입
 * @param {string} key - 상태를 저장하고 불러오는 데 사용할 로컬스토리지 키
 * @param {T} initialValue - 상태의 초기값
 * @returns {Array} - 상태와 상태를 설정하는 함수를 포함한 배열
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => getItem(key, initialValue));

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
