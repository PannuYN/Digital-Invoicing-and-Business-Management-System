<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\Invoice;
use Illuminate\Http\Request;

class WalletController extends Controller
{

    public function receive(Request $request){
        $amount = $request->input('amount');
        $balance = new Balance();
        $balance->balance = $amount;
        $balance->save();
    }
    // Function to transfer money
    public function pay(Request $request)
    {
        $balance = new Balance();
        $balance->balance = Balance::latest()->first()->balance;
        $id = $request->input('id');
        $amount = $request->input('amount');

        // Check if the amount is valid
        if ($amount <= 0) {
            return response()->json(['message' => 'Invalid amount'], 400);
        }

        // Check if the balance is sufficient for the transfer
        if ($amount > $balance->balance) {
            return response()->json(['message' => 'Insufficient balance'], 400);
        }

        // Update balance
        $balance->balance -= $amount;
        $balance->save();
        $newBalance = Balance::latest()->first()->balance;

        // Here you would implement logic to transfer money to the other account
        // For now, let's assume the transfer is successful

        //changing status
        $invoice = Invoice::findOrFail($id);
        $invoice->status = 'paid';
        $invoice->save();

        // Return response
        return response()->json(['message' => 'Transfer successful', 'new_balance' => $newBalance]);
    }

    // Function to get current balance
    public function getBalance()
    {
        return response()->json(['balance' => Balance::latest()->first()->balance]);
    }
}
