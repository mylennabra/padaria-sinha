<?php

namespace App\Http\Requests\Client;

use App\Http\Requests\BaseFormRequest;

class ChangeClientRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'cpf' => ['required', 'string'],
            'address' => ['nullable', 'string'],
            'primary_phone' => ['required', 'string'],
            'secondary_phone' => ['nullable', 'string'],
            'obs' => ['nullable', 'string'],
        ];
    }
}
