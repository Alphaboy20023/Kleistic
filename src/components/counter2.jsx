import { useState, useEffect } from "react";



const calculateTimeLeft = (targetedDate) => {
    const difference = new Date(targetedDate) - new Date();
    if (difference <= 0) return null;

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / (1000)) % 60)
    }
};
const CountTimer = ({ targetedDate }) => {


    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetedDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(targetedDate);
            if (!newTimeLeft) {
                clearInterval(timer);
                setTimeLeft(null);
            } else {
                setTimeLeft(newTimeLeft)
            }

        }, 1000);

        return () => clearInterval(timer);
    }, [targetedDate])

    if (!timeLeft) return null
    const format = (val) => String(val).padStart(2, '0')

    return (
        <>
            <div className="flex  space-x-3 text-dark  items-center">
                <div className="rounded-full w-20 h-20 bg-white  flex items-center justify-center flex-col">
                    <div className="text-sm font-semibold text-center">Hours</div>
                    <div className="text-md font-bold text-center">{format(timeLeft.hours)}</div>
                </div>
                <div className="rounded-full w-20 h-20 bg-white flex flex-col items-center justify-center ">
                    <div className="text-sm font-semibold text-center">Days</div>
                    <div className="text-md font-bold text-center">{format(timeLeft.days)}</div>
                </div>
                <div className="rounded-full w-20 h-20 bg-white flex flex-col items-center justify-center">
                    <div className="text-sm font-semibold text-center">Minutes</div>
                    <div className="text-md font-bold text-center">{format(timeLeft.minutes)}</div>
                </div>
                <div className="rounded-full w-20 h-20 bg-white flex flex-col items-center justify-center ">
                    <div className="text-sm font-semibold text-center">Seconds</div>
                    <div className="text-md font-bold text-center">{format(timeLeft.seconds)}</div>
                </div>
            </div>

        </>
    )


}

export default CountTimer;