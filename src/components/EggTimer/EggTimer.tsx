import { useState, useEffect, useCallback, FC } from 'react';
import confetti from 'canvas-confetti';
import './EggTimer.scss';

// Define the interface for egg timings
interface EggTimings {
	hardBoiled: number;
	softBoiled: number;
	poached: number;
	fried: number;
}

// Define the cooking times for each method
const COOKING_TIMES: EggTimings = {
	hardBoiled: 600, // 10 minutes in seconds
	softBoiled: 480, // 8 minutes in seconds
	poached: 240,    // 4 minutes in seconds
	fried: 5,        // 5 seconds for demo purposes
};

// Define the type for cooking methods
type CookingMethod = keyof EggTimings;

// Define the names for each cooking method
const EGG_TIMING_NAMES: Record<CookingMethod, string> = {
	hardBoiled: 'Hard Boiled',
	softBoiled: 'Soft Boiled',
	poached: 'Poached',
	fried: 'Fried',
};

const EggTimer: FC = () => {
	const [selectedMethod, setSelectedMethod] = useState<CookingMethod | ''>('');
	const [timeRemaining, setTimeRemaining] = useState<number>(0);
	const [isActive, setIsActive] = useState(false);

	// Load saved method and time from local storage on component mount
	useEffect(() => {
		const savedMethod = localStorage.getItem('selectedMethod') as CookingMethod;
		const savedTime = Number(localStorage.getItem('timeRemaining'));
		if (savedMethod) setSelectedMethod(savedMethod);
		if (savedTime) setTimeRemaining(savedTime);
	}, []);

	// Save method and time to local storage and handle timer logic
	useEffect(() => {
		localStorage.setItem('selectedMethod', selectedMethod);
		localStorage.setItem('timeRemaining', timeRemaining.toString());
		let interval: ReturnType<typeof setInterval> | null = null;

		if (isActive && timeRemaining > 0) {
			interval = setInterval(() => {
				setTimeRemaining((time) => time - 1);
			}, 1000);
		} else {
			if (timeRemaining === 0 && isActive) {
				handleTimerEnd();
			}
		}

		// Cleanup the interval when the component unmounts
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive, timeRemaining, selectedMethod]);

	// Handle the end of the timer
	const handleTimerEnd = useCallback(() => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
		setTimeRemaining(COOKING_TIMES[selectedMethod as CookingMethod]);
		setIsActive(false);
	}, [selectedMethod]);

	// Start the timer
	const startTimer = useCallback(() => {
		if (selectedMethod !== '') {
			setIsActive(true);
		}
	}, [selectedMethod]);

	// Format the time in minutes and seconds
	const formatTime = useCallback((seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}, []);

	const methodSelected = selectedMethod !== '';

	return (
		<>
			{methodSelected && (
				<div className="secondary-title">Cooking method: {EGG_TIMING_NAMES[selectedMethod as CookingMethod]}</div>
			)}
			<div className="cooking-options">
				{Object.keys(COOKING_TIMES).map((method) => (
					<img
						key={method}
						data-testid={method}
						src={`src/assets/${method}.png`}
						alt={EGG_TIMING_NAMES[method as CookingMethod]}
						style={{ width: '160px', height: '160px', objectFit: 'cover' }}
						onClick={() => {
							if (isActive) return;
							setSelectedMethod(method as CookingMethod);
							setTimeRemaining(COOKING_TIMES[method as CookingMethod]);
						}}
						className={selectedMethod === method ? 'active' : ''}
					/>
				))}
			</div>
			<div className="timer-display">
				<h3>{formatTime(timeRemaining)}</h3>
				<button
					onClick={startTimer}
					disabled={isActive || !methodSelected}
					data-testid="start-button"
				>
					{isActive ? 'Cooking...' : 'Start Cooking'}
				</button>
				<button
					onClick={() => {
						setIsActive(false);
						if (selectedMethod !== '') {
							setTimeRemaining(COOKING_TIMES[selectedMethod]);
						}
					}}
					disabled={!isActive}
					data-testid="stop-button"
				>
					Stop Cooking
				</button>
			</div>
		</>
	);
};

export default EggTimer;

