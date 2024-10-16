<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(SignupRequest $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->password = Hash::make($request->password);
        if($user->save()){
            return response([
                "message" => "Registered Successfully"
            ]);
        }
    }
    public function login(LoginRequest $request){
        if(!Auth::attempt($request->only("email","password"))){
            return response([
                "message" => "Invalid Email or Password"
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        //tokenization
        $token = $user->createToken('token')->plainTextToken;
        $cookie = cookie('jwt', $token, 60 * 24); //for 1 day

        return response([
            'message' => "Logged in Successfully",
            'role' => $user->role,
            'name' => $user->name,
            'email' => $user->email
        ])->withCookie($cookie);
    }

    public function user(){
        return Auth::user();
    }

    public function logout(){
        $cookie = Cookie::forget('jwt');

        return response([
            'message'=> 'Logged out'
        ])->withCookie($cookie);
    }

}

