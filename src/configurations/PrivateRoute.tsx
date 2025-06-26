import React from "react";
import { Navigate } from "react-router-dom";
import { Page403 } from "@/pages/errors";
import { ROLE, UserStatus } from "@/enum/auth.enum";
import { useAuth } from "@/hoc/AuthProvider";
import { CustomBackdrop } from "@/components/custom";

interface Props {
  component: React.ComponentType;
  path?: string;
  roles?: ROLE;
  skipRoleCheck?: boolean;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  roles,
  skipRoleCheck = false,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-center items-center h-screen bg-primarydeep/75">
          <CustomBackdrop isLoading={true} />
        </div>
      </div>
    );
  }

  const normalizeRole = (role: string) =>
    role.toLowerCase().replace("role_", "");

  const userHasRequiredRole =
    skipRoleCheck ||
    (user && user.role
      ? normalizeRole(user.role) === normalizeRole(roles || "")
      : false);

  if (user && user.status === UserStatus.AWAITING_COMPANY_INFO && !skipRoleCheck) {
    return <Navigate to="/company/registration" replace />;
  }

  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <Page403 />;
  }

  return <Navigate to="/login" />;
};
