"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SigninButton from "./SigninButton";
import SignupButton from "./SignupButton";
import { useSession } from "next-auth/react";

interface NavListProps {
  isAdmin: boolean;
}

function NavList(props: NavListProps) {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <CubeTransparentIcon className="h-[18px] w-[18px]" />
          Podcasts
        </ListItem>
      </Typography>
      {props.isAdmin && (
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <UserCircleIcon className="h-[18px] w-[18px]" />
            Admin Panel
          </ListItem>
        </Typography>
      )}
    </List>
  );
}

export default function AppBar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { data: session } = useSession();
  const isAdmin =
    (session && session.user && session.user.role == "admin") ?? false;

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Not you pod
        </Typography>
        <div className="hidden lg:block">
          <NavList isAdmin={isAdmin} />
        </div>
        <div className="hidden gap-2 lg:flex">
          <SigninButton />
          <SignupButton />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList isAdmin={isAdmin} />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <SigninButton />
          <SignupButton />
        </div>
      </Collapse>
    </Navbar>
  );
}
