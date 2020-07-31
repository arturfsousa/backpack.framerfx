import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @ts-ignore
import BpkFieldset from "backpack-transpiled/bpk-component-fieldset"
// @ts-ignore
import BpkInput from "backpack-transpiled/bpk-component-input"
import BpkAutosuggest, {
    BpkAutosuggestSuggestion,
    // @ts-ignore
} from "backpack-transpiled/bpk-component-autosuggest"

const defaultOptionsText =
    "Australia, Austria, Canada, Czech Republic, Germany, Hungary, India, Italy, Norway, Romania, Singapore, Spain, UK, USA"

const getSuggestionValue = (suggestion) => suggestion

const renderSuggestion = (suggestion) => (
    <BpkAutosuggestSuggestion
        value={suggestion}
        // subHeading={suggestion.country}
        // tertiaryLabel="Airport"
        // indent={suggestion.indent}
        // icon={BpkFlightIcon}
    />
)

export function Autosuggest(props) {
    const {
        _isFieldSet,
        required,
        label,
        description,
        prompt,
        validationMessage,
        disabled,
        onChange,
        onSuggestionSelected,
        onFocus,
        onBlur,
        onSubmit,
    } = props

    const [value, setValue] = React.useState(props.value)
    const [valid, setValid] = React.useState(props.valid)
    const [suggestions, setSuggestions] = React.useState([])

    React.useEffect(() => setValue(props.value), [props.value])
    React.useEffect(() => setValid(props.valid), [props.valid])

    const optionArray = props.options
        ? props.options
        : optionsFromText(props.optionsText)

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length

        return inputLength === 0
            ? []
            : optionArray.filter(
                  (option) => option.toLowerCase().indexOf(inputValue) !== -1
              )
    }

    const handleChange = (event, { newValue }) => {
        setValue(newValue)
        onChange && onChange(newValue)
    }

    const onSuggestionsFetchRequested = ({ value }) =>
        setSuggestions(getSuggestions(value))

    const onSuggestionsClearRequested = () => setSuggestions([])

    const inputProps = {
        id: "autosuggest",
        name: "autosuggest",
        placeholder: prompt,
        value,
        onChange: handleChange,
        onFocus: () => {
            if (onFocus) onFocus()
        },
        onBlur: () => {
            if (onBlur) onBlur()
        },
        onKeyDown: (e) => {
            if (e.keyCode === 13) {
                if (onSubmit) onSubmit()
            }
        },
    }

    const disabledInput = (
        <BpkInput
            id={label}
            name={label}
            value={value}
            valid
            disabled
            placeholder={prompt}
        />
    )

    const autosuggest = (
        <BpkAutosuggest
            onSuggestionSelected={() => {
                if (onSuggestionSelected) onSuggestionSelected()
            }}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            valid={valid}
        />
    )

    const control = disabled ? disabledInput : autosuggest

    const fieldSet = (
        <BpkFieldset
            disabled={disabled}
            required={required}
            label={label}
            description={description}
            validationMessage={validationMessage}
        >
            {control}
        </BpkFieldset>
    )

    return _isFieldSet ? fieldSet : control
}

Autosuggest.defaultProps = {
    height: 36,
    width: 240,
    _isFieldSet: false,
    disabled: false,
    value: "",
    prompt: "Type something",
    optionsText: defaultOptionsText,
    options: null,
    onChange: () => null,
}

addPropertyControls(Autosuggest, {
    _isFieldSet: {
        type: ControlType.Boolean,
        title: "Field Set",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    required: {
        type: ControlType.Boolean,
        title: "Required",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
        hidden(props) {
            return props._isFieldSet === false
        },
    },
    label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Label",
        placeholder: "None",
        hidden(props) {
            return props._isFieldSet === false
        },
    },
    description: {
        title: "Description",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "None",
        displayTextArea: true,
        hidden(props) {
            return props._isFieldSet === false
        },
    },
    validationMessage: {
        title: "Error",
        type: ControlType.String,
        defaultValue: "Please enter a value",
        placeholder: "None",
        hidden(props) {
            return props._isFieldSet === false
        },
    },
    valid: {
        type: ControlType.Boolean,
        title: "Validation",
        defaultValue: true,
        enabledTitle: "Valid",
        disabledTitle: "Invalid",
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    value: {
        title: "Value",
        type: ControlType.String,
        defaultValue: "",
        placeholder: "None",
    },
    optionsText: {
        type: ControlType.String,
        title: "Options",
        defaultValue: defaultOptionsText,
        placeholder: "None",
        displayTextArea: true,
    },
    prompt: {
        title: "Prompt",
        type: ControlType.String,
        defaultValue: "Type something",
        placeholder: "None",
    },
    onSubmit: { type: ControlType.EventHandler },
    onSuggestionSelected: { type: ControlType.EventHandler },
    onFocus: { type: ControlType.EventHandler },
    onBlur: { type: ControlType.EventHandler },
})

function optionsFromText(text) {
    return text.split(",").map((item) => item.trim())
}

Autosuggest.displayName = "Auto-suggest"
