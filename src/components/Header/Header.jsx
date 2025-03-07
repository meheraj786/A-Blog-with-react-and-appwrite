import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Navbar, MobileNav, Typography, IconButton } from "@material-tailwind/react";
import { Container, Logo, LogoutBtn } from '../index';
import ThemeBtn from "./ThemeBtn";

function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup" , active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Profile", slug: "/profile", active: authStatus },
  ];

  const navList = (
    <ul className="mb-4 dark:text-white flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black">
      {navItems.map((item) =>
        item.active && (
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className={`p-1 font-normal ${location.pathname === item.slug ? ' font-bold' : ''}`}
            key={item.name}
          >
            <button
              onClick={() => navigate(item.slug)}
              className={`flex items-center ${item.slug === '/signup' ? 'bg-black text-white rounded-md px-4 py-2' : ''}`}
            >
              {item.name}
            </button>
          </Typography>
        )
      )}
      {authStatus && (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <LogoutBtn/>
          </Typography>
          
        </>
      )}
    </ul>
  );

  return (
    <Navbar className="sticky dark:bg-[#424245] top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-5 lg:py-2">
      <Container>
        <div className="flex pt-2 lg:pt-0 items-center justify-between text-blue-gray-900">
          <Link to="/">
            <Logo width="250px" />
          </Link>
          <div className="flex gap-5 lg:gap-0 items-center">
            <div className="lg:mr-4 hidden lg:block">{navList}</div>
            <div className="flex lg:hidden">
              
              <IconButton
                variant="text"
                className="ml-auto mb-5 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="black"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
             
            </div>
            <ThemeBtn />
          </div>
        </div>
        <MobileNav className='mb-5 lg:mb-0' open={openNav}>{navList}</MobileNav>
      </Container>
    </Navbar>
  );
}

export default Header;
