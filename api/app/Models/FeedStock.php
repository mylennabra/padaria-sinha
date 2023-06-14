<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeedStock extends BaseModel
{
    protected $fillable = [
        'feed_stock_code',
        'product_code',
    ];

    public function feedStock(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeByProduct(Builder $query, string $code): Builder
    {
        return $query->where('product_code', $code);
    }

    public function scopeByName(Builder $query, string $code): Builder
    {
        return $query->where('feed_stock_code', $code);
    }
}
