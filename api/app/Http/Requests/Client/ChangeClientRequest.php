<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class ChangeClientRequest extends FormRequest
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
            'address' => ['string'],
            'primary_phone' => ['required', 'string'],
            'secondary_phone' => ['string'],
            'obs' => ['string'],
        ];
    }
}
