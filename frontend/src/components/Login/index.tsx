import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { QueryKeys } from "../../config/QueryKeys";
import { ApiError } from "../../entities";
import logo from "../../imgs/logo.png";
import { AuthService, LoginData } from "../../services";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<LoginData>();
  const formData = watch();
  const loginMutation = useMutation({
    mutationKey: [QueryKeys.PRODUCTS],
    mutationFn: () => AuthService.login(formData),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  return (
    <div className="login">
      <img src={logo} className="logo" />
      <div className="login-ctn">
        <label htmlFor="codigo">LOGIN:</label>
        <input type="text" id="codigoReceita" {...register("email")} />

        <label htmlFor="senha">SENHA:</label>
        <input type="password" id="senha" {...register("password")} />
        <button
          className="btn"
          style={{ marginTop: "1rem" }}
          onClick={handleSubmit(() => loginMutation.mutate())}
        >
          ENTRAR
        </button>
      </div>
    </div>
  );
};

export default Login;
