<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageMail extends Model
{
    use HasFactory;
    protected $table = "message_mail";
    public $timestamps = false;
}
