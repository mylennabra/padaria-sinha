import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { QueryKeys } from "../../config/QueryKeys";
import { Client } from "../../entities";
import { ApiError } from "../../entities/ApiError.type";
import ClientService from "../../services/ClientService";
import {
  closeModal,
  getClientFilters,
  getClientFiltersInputs,
  resetClientInputs,
} from "../../utils";

export function useClients() {
  const { register, handleSubmit, watch, reset } = useForm<Client>();
  const resetFields = () => {
    reset({
      name: "",
      cpf: "",
      address: "",
      primaryPhone: "",
      secondaryPhone: "",
      obs: "",
    });
  };

  const formData = watch();
  const isUpdating = !!formData.code;

  const { data: clients, refetch: refetchClients } = useQuery<Client[]>({
    queryKey: [QueryKeys.CLIENTS],
    queryFn: () => ClientService.getAll(getClientFilters()),
  });

  const handleFilterEnterKey = (key: string) => {
    if (key === "Enter") {
      refetchClients();
    }
  };

  useEffect(() => {
    resetClientInputs();

    getClientFiltersInputs().forEach((input) => {
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

  const createClientMutation = useMutation({
    mutationKey: [QueryKeys.CLIENTS],
    mutationFn: (data: Client) => ClientService.create(data),
    onSuccess: () => {
      resetFields();
      refetchClients();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const updateClientMutation = useMutation({
    mutationKey: [QueryKeys.CLIENTS],
    mutationFn: (client: Client) => ClientService.update(client),
    onSuccess: () => {
      resetFields();
      refetchClients();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const deleteClientMutation = useMutation({
    mutationKey: [QueryKeys.CLIENTS],
    mutationFn: (code: string) => ClientService.delete(code),
    onSuccess: () => {
      resetFields();
      refetchClients();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<Client> = () => {
    if (isUpdating) {
      updateClientMutation.mutate(formData);
    } else {
      createClientMutation.mutate(formData);
    }
  };

  return {
    register,
    handleSubmit,
    formData,
    clients,
    refetchClients,
    resetFields,
    reset,
    isUpdating,
    onSubmit,
    deleteClientMutation,
  };
}
