<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
