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
import BpkPagination from "backpack-transpiled/bpk-component-pagination"

export function Pagination(props) {
    const { pageCount, _selectedPage, visibleRange, onPageChange } = props

    const [selectedPageIndex, setSelectedPageIndex] = React.useState(
        _selectedPage - 1
    )

    React.useEffect(() => setSelectedPageIndex(_selectedPage - 1), [
        _selectedPage,
    ])

    const handlePageChange = (pageIndex) => {
        setSelectedPageIndex(pageIndex)
        onPageChange && onPageChange(pageIndex)
    }

    return (
        <BpkPagination
            pageCount={pageCount}
            selectedPageIndex={selectedPageIndex}
            onPageChange={handlePageChange}
            previousLabel="previous"
            nextLabel="next"
            paginationLabel={`page ${_selectedPage + 1}`}
            visibleRange={visibleRange}
            pageLabel={(page, isSelected) => `page ${page}`}
        />
    )
}

Pagination.defaultProps = {
    height: 36,
    width: 384,
}

addPropertyControls(Pagination, {
    pageCount: {
        title: "Pages",
        type: ControlType.Number,
        min: 1,
        defaultValue: 20,
    },
    _selectedPage: {
        title: "Current",
        type: ControlType.Number,
        min: 1,
        defaultValue: 1,
        displayStepper: true,
    },
    visibleRange: {
        title: "Range",
        type: ControlType.Number,
        defaultValue: 3,
        min: 1,
        max: 7,
        step: 2,
        displayStepper: true,
    },
    onPageChange: {
        type: ControlType.EventHandler,
    },
})
