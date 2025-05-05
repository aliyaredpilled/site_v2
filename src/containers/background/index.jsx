import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Battery from "../../components/shared/Battery";
import { Icon, Image } from "../../utils/general";
import "./back.scss";
import Background from "./Background";
import BootScreen from "./BootScreen";
import LockScreen from "./LockScreen";
import ShutdownScreen from './ShutdownScreen';

export { Background, BootScreen, LockScreen, ShutdownScreen };