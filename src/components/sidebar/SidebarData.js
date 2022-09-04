import {
    FaBookmark
    , FaHome
    , FaSearchLocation
    , FaUserAlt
} from 'react-icons/fa';

import { MdOutlinePayment } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsCalendarWeek, BsTelephoneFill } from 'react-icons/bs';

export const SidebarData = [
    {
        // home will have all the notifications
        // like the upcoming trips etc.
        id: 1,
        name: "Home",
        link: "/home",
        icon: <FaHome />
    },
    {
        // search will specifically contain the search option
        // display the results one by one
        id: 2,
        name: "Search",
        link: "/search",
        icon: <FaSearchLocation />
    },
    {
        // upcoming and past select drop down
        // default will be upcoming
        id: 3,
        name: "Bookings",
        link: "/booking",
        icon: <BsCalendarWeek />
    },
    {
        // wishlist that user has added
        id: 4,
        name: "Bookmark",
        link: "/bookmark",
        icon: <FaBookmark />
    },
    {
        id: 5,
        name: "Profile",
        link: "/profile",
        icon: <FaUserAlt />,
    },
    {
        id: 6,
        name: "Payment Details",
        link: "/payment",
        icon: <MdOutlinePayment />,
    },
    {
        id: 7,
        name: "Listings",
        link: "/profile/listing",
        icon: <AiOutlineUnorderedList />,
    },
    {
        id: 8,
        name: "Contact us",
        link: "/contact",
        icon: <BsTelephoneFill />,
    },
];