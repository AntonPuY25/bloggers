import {Router} from "express";
import {clearDataController} from "../compositionRoots/compositions-root";

export const testingRoute = Router({});

testingRoute.delete('/all-data', clearDataController.allClear.bind(clearDataController))