<?php

namespace App\Http\Controllers\APIAuth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string']
        ]); 

        if( !Auth::attempt(['email' => $request->email, 'password' => $request->password]) ){
            return response([
                'message' => 'The Provided Credentials Do Not Match !!'
                ]);
        }

        $accessToken = Auth::user()->createToken('auth-token')->accessToken;

        return response([
            'user' => Auth::user(),
            'access_token' => $accessToken
        ]);
        
        // QIROLAB PASSPORT Providing AUTH
        // $user = User::where('email', $request->email)->first();

        // if( !$user || !Hash::check($request->password, $user->password )){
        //     throw ValidationException::withMessages([
        //         'email' => ['The Provided Credentials Do Not Match !!']
        //     ]);
        // }

        // return $user->createToken('auth-token')->accessToken;
    }
}
