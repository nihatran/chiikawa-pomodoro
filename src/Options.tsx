import { useState } from "react";
import "./Options.css";
import { Dialog } from "radix-ui";

export default () => (
  <Dialog.Root>
    <Dialog.Trigger />
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title />
        <Dialog.Description />
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

interface OptionsProps {
  setPomodoroTime: React.Dispatch<React.SetStateAction<number>>;
  setShortBreak: React.Dispatch<React.SetStateAction<number>>;
  setLongBreak: React.Dispatch<React.SetStateAction<number>>;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

export function Options({
  setPomodoroTime,
  setShortBreak,
  setLongBreak,
  setTimeLeft,
}: OptionsProps) {
  const [pomodoroInput, setPomodoroInput] = useState("25");
  const [shortInput, setShortInput] = useState("5");
  const [longInput, setLongInput] = useState("15");

  const handleChangePomodoro = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPomodoroInput(event.target.value);
  };

  const handleChangeShort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShortInput(event.target.value);
  };

  const handleChangeLong = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongInput(event.target.value);
  };

  const handleSave = () => {
    const newPomodoro = parseInt(pomodoroInput) * 60;
    const newShort = parseInt(shortInput) * 60;
    const newLong = parseInt(longInput) * 60;

    setPomodoroTime(newPomodoro);
    setShortBreak(newShort);
    setLongBreak(newLong);

    setTimeLeft(newPomodoro);
  };

  return (
    <>
      <h2>Options</h2>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="optionsBtn">
            <img className="star" src="chiikawastar.png"></img>
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Description className="DialogDescription">
              Customize Pomodoro
            </Dialog.Description>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="pomodorotime">
                Pomodoro
              </label>
              <input
                className="Input"
                id="pomodorotime"
                value={pomodoroInput}
                onChange={handleChangePomodoro}
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="shortbreak">
                Short Break
              </label>
              <input
                className="Input"
                id="shortbreak"
                value={shortInput}
                onChange={handleChangeShort}
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="longbreak">
                Long Break
              </label>
              <input
                className="Input"
                id="longbreak"
                value={longInput}
                onChange={handleChangeLong}
              />
            </fieldset>
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <Dialog.Close asChild>
                <button className="Button pink" onClick={handleSave}>
                  Save changes
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <img src="/closeicon.svg"></img>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
