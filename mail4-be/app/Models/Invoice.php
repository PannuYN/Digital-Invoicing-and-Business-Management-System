<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'sent',
        'status',
        'issue_date',
        'due_date',
        'shipping_fee',
        'invoice_status',
        'created_by'
    ];

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public $timestamps = false; //because I want no timestamp
}
