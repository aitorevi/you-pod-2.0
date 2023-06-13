"use client"
import {useState, useEffect} from "react";
import {useTheme} from 'next-themes'
import {Switch} from "@material-tailwind/react";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <div className="flex mr-3">
        <Switch onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} defaultChecked/>
        </div>
    )
}
export default ThemeSwitcher