import "react-credit-cards-2/dist/es/styles-compiled.css";
import { type ChangeEventHandler, type FC, type FocusEventHandler, useRef, useState } from "react";
import {
  formatCVC,
  formatCreditCardNumber,
  formatExpirationDate,
} from "../utils/card-utils";
import Cards, { type Focused } from "react-credit-cards-2";
import { useKeyPress } from "../hooks/useKeyPress";

type CardState = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: undefined | Focused;
};

const inputStyle = `
  w-full max-w-xs px-4 py-3 rounded-xl outline-none
  bg-zinc-800/50 border border-white/10 backdrop-blur-sm
  text-neutral-200 placeholder:text-zinc-600
  transition-all duration-300
  focus:bg-zinc-900 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]
`;

type CreditCardProps = {
  submitHandler: (state: Omit<CardState, 'focus'>) => void;
};

const CreditCard: FC<CreditCardProps> = ({ submitHandler }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<CardState>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: undefined,
  });

  const handleInputChange: ChangeEventHandler = (ev) => {
    const target = ev.target as HTMLInputElement;
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setState((val) => ({
      ...val,
      ...{ [target.name]: target.value },
    }));
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (evt) => {
    const target = evt.target as HTMLInputElement;
    const targetName = target.name as Focused;
    setState((prev) => ({ ...prev, focus: targetName }));
  };

  const setInputValue = (inputName: string, value: string) => {
    const target = formRef.current?.elements.namedItem(
      inputName
    ) as HTMLInputElement;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      globalThis.HTMLInputElement.prototype,
      "value"
    )!.set;

    nativeInputValueSetter!.call(target, value);

    const inputEvent = new Event("input", { bubbles: true });
    target.dispatchEvent(inputEvent);
  };

  useKeyPress('H', () => {
    setInputValue('number', "2222 2222 2222 2222");
    setInputValue('name', "Test");
    setInputValue('expiry', "12/27");
    setInputValue('cvc', "123");
  });

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-4 items-center"
      onSubmit={(ev) => {
        ev.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { focus, ...restOfState } = state
        submitHandler(restOfState);
      }}
    >
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <div className="form-inputs w-full px-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            pattern="^(\d\s?){16}(?=\D*$)|(\d\s?){19}(?=\D*$)$"
            required
            className={inputStyle}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <small className="text-xs text-zinc-500 ml-2">Eg: XXXX XXXX XXXX XXXX</small>
        </div>
        <div>
          <input
            type="text"
            name="name"
            className={inputStyle}
            placeholder="Cardholder Name"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="tel"
              name="expiry"
              className={`${inputStyle} w-full`} // Ensure full width within flex
              placeholder="MM/YY"
              pattern="^(0[1-9]|1[0-2])\/\d{2}$"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>

          <div className="flex-1">
            <input
              type="tel"
              name="cvc"
              className={`${inputStyle} w-full`} // Ensure full width within flex
              placeholder="CVC"
              pattern="\d{3,4}"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </div>
      </div>
      <div className="form-actions w-44 flex justify-center items-center">
        <button type="submit" className="myBtn px-12 py-3 rounded-full mx-auto">
          PAY
        </button>
      </div>{" "}
      <small className="text-center italic text-xs">
        Press ctrl + shift + H to fill the form with fake values.
      </small>
    </form>
  );
};

export default CreditCard;
