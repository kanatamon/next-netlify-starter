import React, { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";

const normalizeNumericValue = (value) => {
  const number = Number(value.replaceAll(",", ""));
  if (isNaN(number)) return 0;
  return number;
};

const numericToLocaleString = ({
  value,
  decimal,
}) => {
  if (!value) return "";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimal,
  });
};

const Input = ({
  align = "left",
  disabled = false,
  isError = false,
  placeholder = "",
  supportText,
  onChange,
  value,
  title,
  unit,
  className,
  isSupportIcon,
  inputIcon,
  decimal,
  maxRange,
  id,
  isInitialValueToZero = true,
  isBlurInput,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [valueInput, setValueInput] = useState(
    numericToLocaleString({ value, decimal })
  );
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isFocus) {
      setValueInput(numericToLocaleString({ value, decimal }));
    }
  }, [decimal, isFocus, value]);

  useEffect(() => {
    if (isBlurInput) {
      inputRef.current?.blur();
      setIsFocus(false);
    }
  }, [isBlurInput]);

  return (
    <div className={className}>
      <span>{title}</span>
      <div>
        <NumericFormat
          decimalScale={decimal}
          disabled={disabled}
          getInputRef={inputRef}
          id={id}
          inputMode="decimal"
          isAllowed={(values) => {
            const { floatValue } = values;
            if (maxRange) return !floatValue || floatValue <= maxRange;
            return !floatValue;
          }}
          onBlur={(e) => {
            setIsFocus(false);
            if (!isInitialValueToZero && e.target.value === "") {
              return onChange?.(undefined);
            }
            const number = normalizeNumericValue(e.target.value);
            onChange?.(number);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onValueChange={(values) => {
            if (isFocus) onChange?.(values.floatValue);
          }}
          placeholder={placeholder}
          thousandSeparator
          value={valueInput}
        />
        <div className="absolute right-0 top-1/2 -translate-x-0 -translate-y-1/2 transform pl-sm">
          {inputIcon && inputIcon}
          {unit && <div>{unit}</div>}
        </div>
      </div>
    </div>
  );
};

export default Input;
