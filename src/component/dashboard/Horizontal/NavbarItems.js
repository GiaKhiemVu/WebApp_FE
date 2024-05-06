import React from 'react';
import PropTypes from 'prop-types';
import { dashboardRoute } from '@/route/route';
import { Typography } from '@mui/material';

const listItem = [
    {
        name: "HOME",
        url: dashboardRoute.home,
    },
    {
        name: "MENU",
        url: dashboardRoute.menu,
    },
    {
        name: "DRINK",
        url: dashboardRoute.drink,
    },
    {
        name: "FOOD",
        url: dashboardRoute.food,
    },
    {
        name: "ABOUT",
        url: dashboardRoute.about,
    }
];

function NavbarItems() {
    return (
        <>
            {listItem.map((item) => (
                <Typography
                    key={item.name}
                    sx={{ flexGrow: 1 , cursor: 'pointer'}}
                >
                    {item.name}
                </Typography>
            ))}
        </>
    );
}

NavbarItems.propTypes = {};

export default NavbarItems;
