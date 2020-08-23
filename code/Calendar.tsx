/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkCalendar from "backpack-transpiled/bpk-component-calendar"
// @ts-ignore
import format = require("date-fns/format")
const formatDate = (date) => format(date, "DD/MM/YYYY")
const formatDateFull = (date) => format(date, "do MMMM YYYY")
const formatMonth = (date) => format(date, "MMMM YYYY")
const daysOfWeek = [
    {
        name: "Monday",
        nameAbbr: "Mon",
        index: 0,
        isWeekend: false,
    },
    {
        name: "Tuesday",
        nameAbbr: "Tue",
        index: 1,
        isWeekend: false,
    },
    {
        name: "Wednesday",
        nameAbbr: "Wed",
        index: 2,
        isWeekend: false,
    },
    {
        name: "Thursday",
        nameAbbr: "Thu",
        index: 3,
        isWeekend: false,
    },
    {
        name: "Friday",
        nameAbbr: "Fri",
        index: 4,
        isWeekend: false,
    },
    {
        name: "Saturday",
        nameAbbr: "Sat",
        index: 5,
        isWeekend: true,
    },
    {
        name: "Sunday",
        nameAbbr: "Sun",
        index: 6,
        isWeekend: true,
    },
]

export function Calendar(props) {
    const { onDateSelect } = props

    const [selectedDate, setSelectedDate] = React.useState(null)

    const handleDateSelect = (date) => {
        setSelectedDate(date)
        onDateSelect && onDateSelect(date)
    }

    return (
        <BpkCalendar
            id="calendar"
            daysOfWeek={daysOfWeek}
            weekStartsOn={0}
            changeMonthLabel="Change month"
            formatDate={formatDate}
            formatMonth={formatMonth}
            formatDateFull={formatDateFull}
            onDateSelect={handleDateSelect}
            date={selectedDate}
        />
    )
}

Calendar.defaultProps = {
    height: 336,
    width: 294,
}

addPropertyControls(Calendar, {
    onDateSelect: { type: ControlType.EventHandler },
})
