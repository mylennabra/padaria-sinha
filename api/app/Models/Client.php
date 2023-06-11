<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

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

    public function scopeByCode(Builder $query, int $code): Builder
    {
        return $query->where('code', $code);
    }

    public function scopeByName(Builder $query, string $name): Builder
    {
        return $query->where('name', 'like', "%$name%");
    }

    public function scopeByCpf(Builder $query, string $cpf): Builder
    {
        return $query->where('cpf', $cpf);
    }
}
