import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export default (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
