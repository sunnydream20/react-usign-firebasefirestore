import React from 'react';

export const sixMonthModes = ['6M'];
export const maxModes = ['1D', '5D', '1M', '6M', '1Y', '5Y', 'MAX'];
export const fiveYearsModes = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y'];
export const YearModes = ['1D', '5D', '1M', '3M', '6M', '1Y'];
export const twentyYearsModes = ['3M', '6M', '1Y', '2Y', '5Y', '10Y', '20Y'];
export const monthtoFiveYearsModes = ['1M', '3M', '6M', '1Y', '5Y'];
export const monthModes = {
    sixMonthModes: '6 Months',
    maxMode: 'Max Mode',
    fiveYearsMode: 'Five Years',
    yearMode: '1 Year',
    twentyYearsMode: 'Twenty Years',
    monthtoFiveYearsModes: 'Month to Five Years',
};

const ChartWrapper = ({ mode, monthMode = monthModes.fiveYearsMode, onChangeMode, showMode = true, children }) => {
    let graphModes;
    switch (monthMode) {
        case monthModes.sixMonthModes:
            graphModes = sixMonthModes;
            break;
        case monthModes.maxMode:
            graphModes = maxModes;
            break;
        case monthModes.fiveYearsMode:
            graphModes = fiveYearsModes;
            break;
        case monthModes.twentyYearsMode:
            graphModes = twentyYearsModes;
            break;
        case monthModes.yearMode:
            graphModes = YearModes;
            break;
        case monthModes.monthtoFiveYearsModes:
            graphModes = monthtoFiveYearsModes;
            break;
        default:
            graphModes = YearModes;
            break;
    }

    return (
        <div className="text-lg text-[#595959] flex flex-col h-full">
            {showMode && (
                <div className="flex flex-none justify-between max-w-xs">
                    {graphModes.map((m, i) => (
                        <div
                            key={m}
                            style={{
                                width: '37px',
                                height: '27px',
                                marginLeft: monthModes.twentyYearsMode ? '1px' : '',
                                overflow: 'hidden',
                                textAlign: 'center',
                                padding: 0,
                            }}
                            className={`cursor-pointer rounded-[3px] px-1.5 h-[27px] leading-[29px] ${
                                m === mode ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700 hover:text-white'
                            }`}
                            onClick={() => onChangeMode && onChangeMode(m)}
                        >
                            {m}
                        </div>
                    ))}
                </div>
            )}
            {children}
        </div>
    );
};

export default ChartWrapper;
