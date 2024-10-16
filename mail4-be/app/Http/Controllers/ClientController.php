<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function addClient(Request $request){
        $client = new Client();
        $client->name = $request->name;
        $client->email = $request->email;
        if($client->save()){
            return response([
                "message" => "Client is added Successfully"
            ]);
        }
    }

    public function readAllClients(Request $request){
        $clients = Client::all();
        return $clients;
    }

    //fetching orders with invoice id
    public function getClientById($client_id)
    {
        $client = Client::where('id', $client_id)->get();
        return $client;
    }

    public function readAllTopClients(){
        $topClients = DB::select("SELECT c.id, c.name, SUM(o.total_price) AS total_amount
        FROM clients c
        JOIN invoices i ON c.id = i.client_id
        JOIN orders o ON i.id = o.invoice_id
        GROUP BY c.id, c.name
        ORDER BY total_amount DESC
        LIMIT 5;
        ");
        return $topClients;
    }

}
