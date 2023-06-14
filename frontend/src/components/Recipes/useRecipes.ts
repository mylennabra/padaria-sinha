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
import { Recipe } from "../../entities";
import { ApiError } from "../../entities/ApiError.type";
import { FeedStock } from "../../entities/FeedStock.type";
import RecipeService from "../../services/RecipeService";
import {
  closeModal,
  getRecipeFilters,
  getRecipeFiltersInputs,
} from "../../utils";

export type UseRecipesFormData = Recipe & { feedStocks: FeedStock[] };

export interface UseRecipesResult {
  readonly register: UseFormRegister<UseRecipesFormData>;
  readonly handleSubmit: UseFormHandleSubmit<UseRecipesFormData, undefined>;
  readonly refetchRecipes: () => void;
  readonly resetFields: () => void;
  readonly formData: UseRecipesFormData;
  readonly recipes?: Recipe[];
  readonly reset: UseFormReset<UseRecipesFormData>;
  readonly isUpdating: boolean;
  readonly onSubmit: SubmitHandler<Recipe>;
  readonly deleteRecipeMutation: UseMutationResult<
    Recipe,
    ApiError<{
      message: string;
    }>,
    string,
    unknown
  >;
}

export function useRecipes(): UseRecipesResult {
  const { register, handleSubmit, watch, reset } =
    useForm<UseRecipesFormData>();

  const resetFields = () => {
    reset({ name: "", unit: "" });
  };

  const formData = watch();
  const isUpdating = !!formData.code;

  const { data: recipes, refetch: refetchRecipes } = useQuery<Recipe[]>({
    queryKey: [QueryKeys.RECIPES],
    queryFn: () => RecipeService.getAll(getRecipeFilters()),
  });

  const handleFilterEnterKey = (key: string) => {
    if (key === "Enter") {
      refetchRecipes();
    }
  };

  useEffect(() => {
    getRecipeFiltersInputs().forEach((input) => {
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
    mutationFn: (data: Recipe) => RecipeService.create(data),
    onSuccess: () => {
      resetFields();
      refetchRecipes();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const updateProductMutation = useMutation({
    mutationKey: [QueryKeys.PRODUCTS],
    mutationFn: (product: Recipe) => RecipeService.update(product),
    onSuccess: () => {
      resetFields();
      refetchRecipes();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const deleteRecipeMutation = useMutation({
    mutationKey: [QueryKeys.RECIPES],
    mutationFn: (code: string) => RecipeService.delete(code),
    onSuccess: () => {
      resetFields();
      refetchRecipes();
      closeModal();
    },
    onError: (error: ApiError<{ message: string }>) => {
      alert(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<Recipe> = () => {
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
    recipes,
    refetchRecipes,
    resetFields,
    reset,
    isUpdating,
    onSubmit,
    deleteRecipeMutation,
  };
}
