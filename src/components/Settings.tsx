import { forwardRef, PropsWithChildren } from "react";

interface SettingsProps extends PropsWithChildren {
  isSettingsOpen: boolean;
}

const Settings = forwardRef<HTMLInputElement, SettingsProps>(
  ({ isSettingsOpen, children }, ref) => {
    return (
      <>
        {isSettingsOpen ? (
          <div
            ref={ref}
            className="absolute z-20 bottom-0 left-28 p-2 m-2 rounded-lg text-center bg-slate-500 text-white text-sm"
          >
            <div>{children}</div>
          </div>
        ) : null}
      </>
    );
  }
);

export default Settings;
