import React from "react";

// navigations
import Auth from "./Auth";
import Screens from "./Screens";

import { useSelector } from "react-redux";

const Navigation = () => {
  const { isSignin } = useSelector((state)=>state.auth)
  return isSignin ? <Screens /> : <Auth />
}

export default Navigation;