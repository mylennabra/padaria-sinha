<?php

namespace App\Http\Requests\User;

class StoreUserRequest extends ChangeUserRequest
{
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'password' => ['required', 'string'],
        ];
    }
}
