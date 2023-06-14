<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseFormRequest;

class ChangeUserRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'email' => ['required', 'string'],
            'context' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'O campo login é obrigatório',
            'context.required' => 'O campo permissão é obrigatório',
        ];
    }
}
