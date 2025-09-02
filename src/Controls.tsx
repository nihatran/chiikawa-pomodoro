import "./Controls.css";

interface ControlsProps {
  onStart: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPause: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isRunning: boolean;
}

export function Controls({
  onStart,
  onPause,
  onReset,
  isRunning,
}: ControlsProps) {
  return (
    <>
      <div className="buttonsContainer">
        {isRunning ? (
          <button onClick={onPause}>Pause</button>
        ) : (
          <button onClick={onStart}>Start</button>
        )}
        <button onClick={onReset}>Reset</button>
      </div>
    </>
  );
}
