<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type',
        'image',
        'tags',         
        'begin',
        'end',
        'url',
        'user_id',
    ];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
