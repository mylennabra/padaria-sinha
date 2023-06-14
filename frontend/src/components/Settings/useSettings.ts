import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  useForm,
} from "react-hook-form";
import { QueryKeys } from "../../config/QueryKeys";
import { User } from "../../entities";
import { ApiError } from "../../entities/ApiError.type";
import UserService from "../../services/UserService";
import {
  closeModal,
  getSettingsFilters,
  getSettingsFiltersInputs,
} from "../../utils";

export interface UseSettingsResult {
  readonly register: UseFormRegister<User>;
  readonly handleSubmit: UseFormHandleSubmit<User, undefined>;
  readonly refetchUsers: () => void;
  readonly resetFields: () => void;
  readonly formData: User;
  readonly users?: User[];
  readonly reset: UseFormReset<User>;
  readonly isUpdating: boolean;
  readonly onSubmit: SubmitHandler<User>;
  readonly deleteUserMutation: UseMutationResult<
    User,
    ApiError<{
      message: string;
    }>,
    string,
    unknown
  >;
}

export function useSettings(): UseSettingsResult {
  const { register, handleSubmit, watch, reset } = useForm<User>();
  const resetFields = () => {
    reset({
      id: "",
      name: "",
      email: "",
      password: "",
    });
  };

  const formData = watch();
  const isUpdating = !!formData.id;

  const { data: users, refetch: refetchUsers } = useQuery<User[]>({
    queryKey: [QueryKeys.USERS],
    queryFn: () => UserService.getAll(getSettingsFilters()),
  });

  const handleFilterEnterKey = (key: string) => {
    if (key === "Enter") {
      refetchUsers();
    }
  };

  useEffect(() => {
    getSettingsFiltersInputs().forEach((input) => {
      input.addEventListener("keypress", (event) => {
        handleFilterEnterKey(event.key);
      });
    });

    document.querySelectorAll(".close").forEach((button) => {
      button.addEventListener("click", () => {
        closeModal(button);
        resetFields();
      });
    });
  }, []);

  const createUserMutation = useMutation({
    mutationKey: [QueryKeys.USERS],
    mutationFn: (data: User) => UserService.create(data),
    onSuccess: () => {
      resetFields();
      refetchUsers();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const updateUserMutation = useMutation({
    mutationKey: [QueryKeys.USERS],
    mutationFn: (User: User) => UserService.update(User),
    onSuccess: () => {
      resetFields();
      refetchUsers();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const deleteUserMutation = useMutation({
    mutationKey: [QueryKeys.USERS],
    mutationFn: (code: string) => UserService.delete(code),
    onSuccess: () => {
      resetFields();
      refetchUsers();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<User> = () => {
    if (isUpdating) {
      updateUserMutation.mutate(formData);
    } else {
      createUserMutation.mutate(formData);
    }
  };

  return {
    register,
    handleSubmit,
    formData,
    users,
    refetchUsers,
    resetFields,
    reset,
    isUpdating,
    onSubmit,
    deleteUserMutation,
  };
}
