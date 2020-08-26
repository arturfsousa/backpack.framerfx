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

import BpkStarRating, {
    BpkInteractiveStarRating,
    withInteractiveStarRatingState,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-star-rating"

const InteractiveStarRating = withInteractiveStarRatingState(
    BpkInteractiveStarRating
)

export function StarRating(props) {
    const { large, _isInteractive, rating, onRatingSelect, ...rest } = props

    const handleRatingSelect = (rating) => {
        onRatingSelect && onRatingSelect(rating)
    }

    if (_isInteractive) {
        return (
            <InteractiveStarRating
                id="star-rating"
                large={large}
                maxRating={5}
                onRatingSelect={handleRatingSelect}
                getStarLabel={(rating, maxRating) =>
                    `Rated ${rating} out of ${maxRating} stars`
                }
                {...rest}
            />
        )
    } else {
        return (
            <BpkStarRating
                large={large}
                rating={rating}
                maxRating={5}
                ratingLabel={(rating, maxRating) =>
                    `Rated ${rating} out of ${maxRating} stars`
                }
                {...rest}
            />
        )
    }
}

StarRating.defaultProps = {
    height: 20,
    width: 90,
    rating: 4,
    _isInteractive: false,
}

addPropertyControls(StarRating, {
    large: {
        type: ControlType.Boolean,
        title: "Size",
        defaultValue: false,
        enabledTitle: "Large",
        disabledTitle: "Small",
    },
    _isInteractive: {
        type: ControlType.Boolean,
        title: "Type",
        defaultValue: false,
        enabledTitle: "Interactive",
        disabledTitle: "Static",
    },
    rating: {
        title: "Rating",
        type: ControlType.Number,
        defaultValue: 4,
        min: 0,
        max: 5,
        displayStepper: true,
        hidden: ({ _isInteractive }) => _isInteractive,
    },
    onRatingSelect: {
        type: ControlType.EventHandler,
    },
})

StarRating.displayName = "Star Rating"
