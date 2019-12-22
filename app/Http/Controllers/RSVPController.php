<?php

namespace App\Http\Controllers;

use App\RSVP;
use Illuminate\Http\Request;

class RSVPController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Create a new flight instance.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $rsvp = new RSVP();
        $rsvp->fill($request->all());

        if ($rsvp->save()) {
            return response()->json([
                'status' => 1,
                'message' => 'RSVP successfully create'
            ]);
        } else {
            return response()->json([
                'status' => 0,
                'message' => 'Store RSVP failed, try again later'
            ]);
        }
    }
}
