<?php

namespace App\Http\Requests\Recipe;

use App\Http\Requests\BaseFormRequest;

class ChangeRecipeRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'unit' => ['required', 'string'],
            'amount' => ['nullable', 'numeric'],
            'product_code' => ['required', 'exists:products,code'],
            'feed_stocks.*.name' => ['required', 'string'],
            'feed_stocks.*.unit' => ['required', 'string'],
            'feed_stocks.*.amount' => ['required', 'numeric'],
        ];
    }
}
