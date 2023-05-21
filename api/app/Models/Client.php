<?php

namespace App\Models;

class Client extends BaseModel
{
    protected $primaryKey = 'code';

    protected $fillable = [
        'name',
        'cpf',
        'address',
        'primary_phone',
        'secondary_phone',
        'obs',
    ];
}
