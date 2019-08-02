import React, { useState } from "react";
//import { Helmet } from "react-helmet";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import withLanguage from "../withLanguage";
import withStorage from "@freesewing/components/withStorage";
import AppContext from "../../context/app";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as themes from "@freesewing/mui-theme";
import Navbar from "./navbar";
import Footer from "./footer";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import Breadcrumbs from "../breadcrumbs";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageIcon from "@material-ui/icons/Translate";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Fab from '@material-ui/core/Fab';
import "@freesewing/css-theme";
import "typeface-roboto-condensed";
import "typeface-permanent-marker";
import { injectIntl } from "react-intl";
import PreviousNext from "../previous-next";
import MainMenu from "./main-menu";
import MainPage from "./main-page";
import HomePage from "../pages/homepage";
import ShoutOuts from "./shout-outs";

/* This component is the root component for all pages */

const App = props => {
  // React hooks
  const mobile = useMediaQuery("(max-width:599px)");
  const tablet = useMediaQuery("(min-width: 600px) and (max-width: 959px)");
  const [theme, setTheme] = useState(props.storageData.theme || "light");
  const [menu, setMenu] = useState(false);
  const [crumbs, setCrumbs] = useState(props.pageContext.crumbs || false);
  const [title, setTitle] = useState(false);
  const [next, setNext] = useState(false);

  // Prepare props
  const app = {
    frontend: {
      toggleDarkMode: () => {
        if (theme === "light") {
          setTheme("dark");
          props.updateStorageData("dark", "theme");
        } else {
          setTheme("light");
          props.updateStorageData("light", "theme");
        }
      },
      toggleMenu: () => setMenu(!menu),
      closeNav: () => {
        if (menu) setMenu(false)
      },
      mobile,
      tablet,
      intl: props.intl,
      theme,
      setTitle,
      setCrumbs,
      setNext,
    }
  };

  const uri =(props.location.pathname.slice(-1) === "/")
    ? props.location.pathname.slice(0,-1)
    : props.location.pathname

  const mobileIcons = (
    <p style={{ margin: "2rem 0 100px 0", textAlign: "center"}}>
      <IconButton href="/" color="primary" variant="contained"><HomeIcon /></IconButton>
      <IconButton href="/search" color="primary" variant="contained"><SearchIcon /></IconButton>
      <IconButton href="/language" color="primary" variant="contained"><LanguageIcon /></IconButton>
      <IconButton onClick={app.frontend.toggleDarkMode} color="primary" variant="contained"><DarkModeIcon style={{transform: "rotate(26deg)"}}/></IconButton>
    </p>
  );
  const pageLayout = (uri === "")
    ? <HomePage app={app} />
    : (
      <div className="fs-sa">
        <section>
          <article style={{ maxWidth: '42em', margin: 'auto', }}>
            {(crumbs && title) ? <Breadcrumbs crumbs={crumbs} pageTitle={title} /> : null }
            {title ? <h1>{title}</h1> : null }
            <MainPage app={app} pageContext={props.pageContext} uri={uri} />
            {next ? <PreviousNext pageContext={props.pageContext} theme={theme}/> : null }
            {(crumbs && title) ? <Breadcrumbs crumbs={crumbs} pageTitle={title} /> : null }
          </article>
        </section>
        { mobile ? null : (
        <aside>
          <div className="sticky">
            <MainMenu app={app} pageContext={props.pageContext} uri={uri} />
          </div>
        </aside> )}
      </div>
    )
  // Render
  let wrapperClasses = theme === "light"
    ? "theme-wrapper light"
    : "theme-wrapper dark";
  if (menu) wrapperClasses += " show-menu";

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <div className={wrapperClasses}>
        <AppContext.Provider value={app}>
          {mobile
            ? (
              <React.Fragment>
                <Fab
                  color="primary"
                  className="fab primary only-xs"
                  aria-label="Menu"
                  onClick={app.frontend.toggleMenu}>
                  { menu
                    ? <CloseIcon fontSize="inherit" />
                    : <MenuIcon fontSize="inherit" />
                  }
                </Fab>
                <Navbar app={app} />
              </React.Fragment>
            )
            : <Navbar app={app} />
          }
          {pageLayout}
          { mobile ? (
            <div className="menu" onClick={app.frontend.closeNav}>
              <MainMenu app={app} pageContext={props.pageContext} uri={uri} />
              {mobileIcons}
            </div>
          ) : null }
        </AppContext.Provider>
        <Footer language={props.language} />
        {uri === "" ? <ShoutOuts theme={app.frontend.theme} /> : null}
      </div>
    </MuiThemeProvider>
  );
}

export default withStorage(
  withLanguage(
    injectIntl(App),
    process.env.GATSBY_LANGUAGE
  ), "freesewing.org"
);
