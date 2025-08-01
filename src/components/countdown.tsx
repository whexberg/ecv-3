import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { DateUtils } from '@/src/lib/utils/dates';

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

type CountdownTimerProps = {
    target: DateTime;
    onCountdownEnd?: () => void;
};

const CountdownTimer = (props: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(DateUtils.getTimeUntil(props.target));

    useEffect(() => {
        const interval = setInterval(() => {
            const tl = DateUtils.getTimeUntil(props.target);
            if (tl.days <= 0 && tl.hours <= 0 && tl.minutes <= 0 && tl.seconds <= 0) {
                props.onCountdownEnd?.();
            }
            setTimeLeft(tl);
        }, 500);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [props, props.target]);

    if (timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
        return props.target.toRelative({ base: DateTime.now() });
    }

    return `${timeLeft.days.toFixed()} days, ${timeLeft.hours.toFixed()} hours, ${timeLeft.minutes.toFixed()} minutes, ${timeLeft.seconds.toFixed()} seconds`;
};

export default CountdownTimer;
