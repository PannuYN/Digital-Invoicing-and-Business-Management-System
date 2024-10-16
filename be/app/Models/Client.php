<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'address'
    ];

    public function order()
    {
        return $this->hasMany(Invoice::class);
    }

    public $timestamps = false; //because I want no timestamp
}
