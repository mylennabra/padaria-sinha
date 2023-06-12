import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { QueryKeys } from "../../config/QueryKeys";
import { Product } from "../../entities";
import { ApiError } from "../../entities/ApiError.type";
import ProductService from "../../services/ProductService";
import {
  closeModal,
  getProductFilters,
  getProductFiltersInputs,
} from "../../utils";

export function useProducts() {
  const { register, handleSubmit, watch, reset } = useForm<Product>();
  const resetFields = () => {
    reset({
      group: "",
      description: "",
      price: "0",
      stock: "",
      unit: "",
      obs: "",
    });
  };

  const formData = watch();
  const isUpdating = !!formData.code;

  const { data, refetch: refetchProducts } = useQuery<{
    products: Product[];
    groups: string[];
  }>({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: () => ProductService.getAll(getProductFilters()),
  });

  const products = data?.products;
  const groups = data?.groups;

  const handleFilterEnterKey = (key: string) => {
    if (key === "Enter") {
      refetchProducts();
    }
  };

  useEffect(() => {
    getProductFiltersInputs().forEach((input) => {
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

  const createProductMutation = useMutation({
    mutationKey: [QueryKeys.PRODUCTS],
    mutationFn: (data: Product) => ProductService.create(data),
    onSuccess: () => {
      resetFields();
      refetchProducts();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const updateProductMutation = useMutation({
    mutationKey: [QueryKeys.PRODUCTS],
    mutationFn: (product: Product) => ProductService.update(product),
    onSuccess: () => {
      resetFields();
      refetchProducts();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const deleteProductMutation = useMutation({
    mutationKey: [QueryKeys.PRODUCTS],
    mutationFn: (code: string) => ProductService.delete(code),
    onSuccess: () => {
      resetFields();
      refetchProducts();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<Product> = () => {
    if (isUpdating) {
      updateProductMutation.mutate(formData);
    } else {
      createProductMutation.mutate(formData);
    }
  };

  return {
    register,
    handleSubmit,
    formData,
    products,
    groups,
    refetchProducts,
    resetFields,
    reset,
    isUpdating,
    onSubmit,
    deleteProductMutation,
  };
}
