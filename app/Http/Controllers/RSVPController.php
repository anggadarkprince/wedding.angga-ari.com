<?php

namespace App\Http\Controllers;

use App\Models\RSVP;
use Illuminate\Http\Request;

class RSVPController extends Controller
{
    public function store(Request $request)
    {
        $rsvp = new RSVP();
        $rsvp->fill($request->all());

        if ($rsvp->save()) {
            return redirect()->to('/#rsvp-section')->with([
                'status' => 'success',
                'message' => 'RSVP successfully submitted'
            ]);
        } else {
            return redirect()->to('/#rsvp-section')->with([
                'status' => 'danger',
                'message' => 'Store RSVP failed, try again later'
            ]);
        }
    }
}
