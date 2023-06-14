<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

class Recipe extends BaseModel
{
    protected $primaryKey = 'code';

    protected $fillable = [
        'name',
        'amount',
        'unit',
    ];

    public function scopeByCode(Builder $query, string $code): Builder
    {
        return $query->where('code', $code);
    }

    public function scopeByName(Builder $query, string $name): Builder
    {
        return $query->where('name', 'like', "%$name%");
    }
}
