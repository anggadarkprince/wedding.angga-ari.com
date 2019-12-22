<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RSVP extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'rsvp';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'guest', 'message'
    ];

}
