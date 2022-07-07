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
            className="absolute z-10 top-0 left-40 p-2 m-4 rounded-lg text-center bg-slate-500 text-white"
          >
            <div>{children}</div>
          </div>
        ) : null}
      </>
    );
  }
);

export default Settings;
