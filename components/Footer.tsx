"use client";
import {Typography} from "@material-tailwind/react";
import {FaLinkedinIn, FaMedium, FaTwitter} from "react-icons/fa";

export default function Footer() {
    return (
        <footer
            className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-[#cbdced] py-6 text-center md:justify-between p-4">
            <Typography color="blue-gray" className="font-normal dark:text-white">
                &copy; 2023 You-Pod. All rights reserved
            </Typography>
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                <li>
                    <Typography
                        as="a"
                        href="#"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 dark:text-white dark:hover:text-blue-500 dark:focus:text-blue-500"
                    >
                        About Us
                    </Typography>
                </li>
                <li>
                    <Typography
                        as="a"
                        href="#"
                        color="blue-gray"
                        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 dark:text-white dark:hover:text-blue-500 dark:focus:text-blue-500"
                    >
                        Contact Us
                    </Typography>
                </li>
                <li>
                    <a href='https://linkedin.com/in/aitor-reviriego-amor'>
                        <button aria-label='LinkedIn'>
                            <FaLinkedinIn
                                className="transition-colors hover:text-blue-500 focus:text-blue-500"
                            />
                        </button>
                    </a>
                </li>
                <li>
                    <a href='https://twitter.com/aitorevi'>
                        <button aria-label='Twitter'>
                            <FaTwitter
                                className="transition-colors hover:text-blue-500 focus:text-blue-500"
                            />
                        </button>
                    </a>
                </li>
                <li>
                    <a href='https://medium.com/@aitorevi'>
                        <button aria-label='Medium'>
                            <FaMedium
                                className="transition-colors hover:text-blue-500 focus:text-blue-500"
                            />
                        </button>
                    </a>
                </li>
            </ul>
        </footer>
    );
}
