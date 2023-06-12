<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\BaseFormRequest;

class ChangeProductRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'description' => ['required', 'string'],
            'price' => ['required', 'min:0', 'numeric'],
            'stock' => ['required', 'integer'],
            'group' => ['required', 'string'],
            'unit' => ['required', 'string'],
            'obs' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'description.required' => 'O campo descrição é obrigatório',
            'price.required' => 'O campo preço é obrigatório',
            'price.numeric' => 'O campo preço é deve ser um número decimal',
            'stock.required' => 'O campo estoque é obrigatório',
            'group.required' => 'O campo grupo é obrigatório',
            'unit.required' => 'O campo unidade é obrigatório',
        ];
    }
}
