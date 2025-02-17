import { useEffect, useState } from "react";
import { CookingMethod } from "../components/EggTimer/EggTimer";

export const useEggTimerSetup = () => {
  const [selectedMethod, setSelectedMethod] = useState<CookingMethod | ''>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Load saved method and time from local storage on component mount
  useEffect(() => {
    const savedMethod = localStorage.getItem('selectedMethod') as CookingMethod;
    const savedTime = Number(localStorage.getItem('timeRemaining'));
    if (savedMethod) setSelectedMethod(savedMethod);
    if (savedTime) setTimeRemaining(savedTime);
  }, []);

  return { selectedMethod, timeRemaining, setSelectedMethod, setTimeRemaining };
}