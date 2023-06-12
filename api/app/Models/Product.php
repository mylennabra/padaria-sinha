<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

class Product extends BaseModel
{
    protected $primaryKey = 'code';

    protected $fillable = [
        'description',
        'price',
        'stock',
        'group',
        'unit',
        'obs',
    ];

    public function scopeByCode(Builder $query, string $code): Builder
    {
        return $query->where('code', $code);
    }

    public function scopeByDescription(Builder $query, string $description): Builder
    {
        return $query->where('description', 'like', "%$description%");
    }

    public function scopeByGroup(Builder $query, string $group): Builder
    {
        return $query->where('group', $group);
    }
}
