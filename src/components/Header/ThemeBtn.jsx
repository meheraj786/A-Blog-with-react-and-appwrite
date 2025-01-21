import React from 'react';
import useTheme from '../../Context/Theme';
import { Button } from "@material-tailwind/react";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = () => {
    if (themeMode === "dark") {
      lightTheme();
    } else {
      darkTheme();
    }
  };

  return (
    <Button
      onClick={onChangeBtn}
      className="  rounded-full dark:bg-[#303A69] bg-black p-2.5  text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-black focus:shadow-none active:bg-black hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50disabled:shadow-none"
    >
      {themeMode === "dark" ? (
        <WbSunnyIcon className="w-4  h-4" />
      ) : (
        <NightsStayIcon className="w-4  h-4" />
      )}
    </Button>
  );
}
