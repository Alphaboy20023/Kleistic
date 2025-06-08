import { useEffect, useState } from "react";



const calculateTimeLeft = (targetDate) => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return null;

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / (1000)) % 60),
    };
};

const CountdownTimer = ({ targetDate }) => {


    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));



    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(targetDate);
            if (!newTimeLeft) {
             
                clearInterval(timer);
              
                setTimeLeft(null);
            } else {

                setTimeLeft(newTimeLeft)
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    const format = (val) => String(val).padStart(2, "0");

    return (
        <>
            <div className="flex space-x-4 mb-4 text-dark-800">
                <div>
                    <div className="text-[12px] font-semibold">Days</div>
                    <div className="text-3xl font-bold">{format(timeLeft.days)}</div>
                </div>
                <div className="text-3xl text-orange-600 font-bold flex items-end pb-2">:</div>

                <div>
                    <div className="text-[12px] font-semibold">Hours</div>
                    <div className="text-3xl font-bold">{format(timeLeft.hours)}</div>
                </div>
                <div className="text-3xl text-orange-600 font-bold flex items-end pb-2">:</div>
                <div>
                    <div className="text-[12px] font-semibold">Minutes</div>
                    <div className="text-3xl font-bold">{format(timeLeft.minutes)}</div>
                </div>
                <div className="text-3xl text-orange-600 font-bold flex items-end pb-2">:</div>
                <div>
                    <div className="text-[12px] font-semibold">Seconds</div>
                    <div className="text-3xl font-bold">{format(timeLeft.seconds)}</div>
                </div>

            </div>
        </>
    )
}

export default CountdownTimer