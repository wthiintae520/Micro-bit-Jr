/**
 * Component for the header bar (again?)
 */
import { useState } from 'react';
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoColorPalette, IoColorPaletteOutline } from 'react-icons/io5';
import { SiMicrobit } from 'react-icons/si';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import ThemePickerModal from './ThemePicker';

function Navbar({ colorThemes, activeTheme, setColorTheme }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onModalClose = () => {
        setIsModalOpen(false);
    };
    return (
        <nav>
            <ul>
                <li className="home">
                    <NavLink to="/">
                        {({ isActive }) =>
                            isActive ? (
                                <svg
                                    width="141"
                                    height="141"
                                    viewBox="0 0 141 141"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_1_3)">
                                        <path
                                            d="M40.2849 30.2151C29.6045 30.2276 19.3651 34.4758 11.8129 42.028C4.26072 49.5802 0.012439 59.8196 0 70.5C0.010887 81.1809 4.25867 91.4212 11.8112 98.9737C19.3637 106.526 29.604 110.774 40.2849 110.785H100.721C111.401 110.774 121.641 106.526 129.193 98.9733C136.744 91.4206 140.991 81.1803 141 70.5C141 48.2866 122.934 30.2151 100.721 30.2151H40.2849ZM40.2849 46.3361H100.721C107.128 46.3423 113.27 48.8902 117.801 53.4204C122.331 57.9507 124.879 64.0932 124.885 70.5C124.88 76.9088 122.333 83.0541 117.803 87.5875C113.273 92.1209 107.13 94.6722 100.721 94.6815H40.2849C33.8755 94.6722 27.7315 92.1211 23.2004 87.5879C18.6694 83.0546 16.1213 76.9094 16.1151 70.5C16.1229 64.0927 18.672 57.9502 23.2032 53.4201C27.7344 48.89 33.8776 46.3423 40.2849 46.3361ZM100.022 62.369C98.9533 62.3701 97.8955 62.5818 96.9087 62.9917C95.9219 63.4017 95.0256 64.0021 94.2708 64.7585C93.5161 65.5149 92.9177 66.4125 92.5098 67.4002C92.102 68.3878 91.8927 69.4461 91.8938 70.5147C91.895 71.5832 92.1066 72.6411 92.5166 73.6279C92.9265 74.6146 93.5269 75.511 94.2833 76.2657C95.0397 77.0205 95.9373 77.6189 96.925 78.0267C97.9126 78.4346 98.9709 78.6439 100.039 78.6427C102.198 78.6404 104.266 77.7809 105.791 76.2533C107.315 74.7257 108.17 72.6551 108.168 70.4971C108.165 68.339 107.306 66.2703 105.778 64.746C104.25 63.2217 102.18 62.3667 100.022 62.369ZM40.2966 62.369C38.1378 62.3667 36.0665 63.222 34.5383 64.7469C33.0102 66.2717 32.1503 68.3412 32.148 70.5C32.1457 72.6588 33.001 74.7301 34.5259 76.2583C36.0507 77.7865 38.1202 78.6463 40.279 78.6486C41.3475 78.6498 42.4059 78.4405 43.3935 78.0326C44.3812 77.6248 45.2788 77.0264 46.0352 76.2716C46.7916 75.5169 47.3919 74.6205 47.8019 73.6337C48.2119 72.647 48.4235 71.5891 48.4247 70.5206C48.4258 69.452 48.2165 68.3937 47.8087 67.406C47.4008 66.4184 46.8024 65.5207 46.0477 64.7643C45.2929 64.0079 44.3966 63.4076 43.4098 62.9976C42.423 62.5876 41.3652 62.376 40.2966 62.3749V62.369Z"
                                            fill="url(#paint0_linear_1_3)"
                                        />
                                    </g>
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_1_3"
                                            x1="-12.5"
                                            y1="104"
                                            x2="146"
                                            y2="39.5"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor={activeTheme.colors.color2} />
                                            <stop
                                                offset="1"
                                                stopColor={activeTheme.colors.color3}
                                            />
                                        </linearGradient>
                                        <clipPath id="clip0_1_3">
                                            <rect width="141" height="141" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            ) : (
                                <SiMicrobit />
                            )
                        }
                    </NavLink>
                </li>
                <li className="theme">
                    {isModalOpen ? (
                        <IoColorPalette onClick={() => setIsModalOpen(false)} />
                    ) : (
                        <IoColorPaletteOutline onClick={() => setIsModalOpen(true)} />
                    )}
                </li>
                <li className="info">
                    <NavLink to="info">
                        {({ isActive }) =>
                            isActive ? <AiFillQuestionCircle /> : <AiOutlineQuestionCircle />
                        }
                    </NavLink>
                </li>
            </ul>
            <ThemePickerModal
                isModalOpen={isModalOpen}
                onModalClose={onModalClose}
                colorThemes={colorThemes}
                activeTheme={activeTheme}
                setColorTheme={setColorTheme}
            />
        </nav>
    );
}

export default Navbar;
