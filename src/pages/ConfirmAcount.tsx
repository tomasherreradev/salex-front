import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Alert } from "../utilities/Alert";

const ConfirmAcount: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const confirmAccount = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (token) {
        const response = await fetch(`http://localhost:5000/users/confirm-account?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          console.log(data.message);
        } else {
          console.error(data.error);
        }
      }
    };

    confirmAccount();
  }, [location]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-transparent rounded-lg p-10 w-full max-w-[430px]">
        <Alert
          message="Tu cuenta se confirmó correctamente"
          bgColor="green"
          textColor="white"
        />
        <div className="mt-8 text-center">
          <a
            href="/login"
            className="inline-block align-baseline text-sm text-blue-500 transition-colors hover:text-blue-800"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAcount;
