import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import React, { useEffect, useRef } from "react";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const _exit = useRef(false)

  useEffect(() => {
      M.onBack(() => {
          if (JSON.parse(localStorage.getItem("isMainPage"))) {
              if (_exit.current) M.sys.exit();
              else {
                  M.pop.instance('한번 더 누르시면 앱이 종료됩니다.')
                  _exit.current = true;
                  setTimeout(() => {
                      _exit.current = false;
                  }, 1000)
              }
          }
      })

  }, [])

  return (
    <div className="screen">
      <Header />
      <div style={{flex: 1}}>
        {children}
      </div>
    </div>
  )
}

export const handleLogout = () => {
  localStorage.removeItem('memberId');
  localStorage.removeItem('memberSeq');
};