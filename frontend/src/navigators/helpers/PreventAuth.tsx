import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export type PreventAuthProps = {
  children?: React.ReactElement;
};

export function PreventAuth({ children }: PreventAuthProps) {
  const { isSigned } = useAuth();
  const location = useLocation();

  if (isSigned) {
    return <Navigate replace to="/" state={{ from: location }} />;
  }

  return children || <Outlet />;
}
