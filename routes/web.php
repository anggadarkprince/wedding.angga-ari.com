<?php

use App\Http\Controllers\RSVPController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::post('rsvp', [RSVPController::class, 'store']);
