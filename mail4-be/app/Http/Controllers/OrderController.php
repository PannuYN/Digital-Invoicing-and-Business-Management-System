<?php

namespace App\Http\Controllers;

use App\Mail\SendAlert;
use App\Mail\SendInvoice;
use App\Mail\SendMail;
use App\Models\Client;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function addOrder(Request $request){
        $products = $request->items;
        try{
        $invoice=new Invoice();
        $invoice->client_id = $request->client_id;
        $invoice->issue_date = $request->date;
        $invoice->due_date = $request->due_date;
        $invoice->shipping_fee = $request->shipping_fee;
        $invoice->invoice_status = $request->invoice_status;
        $invoice->created_by = $request->created_by;
        $invoice->save();
        foreach($products as $product){
            $order = new Order();
            $order->invoice_id = $invoice->id;
            $order->product_id = $product['product_id'];
            $order->quantity = $product['quantity'];
            $soldProduct = Product::findOrFail($order->product_id);
            $order->total_price = $soldProduct->price * $order->quantity;
            $order->save();
        }
        /*$client = Client::find($invoice->client_id);
        $response = $client->email;
        $orders = Order::with('product', 'invoice')->where('invoice_id', $invoice->id)->get(); //prepare obj collection to pass along with related data from other table
        //Mail::to($client->email)->send(new SendMail($orders));
        //$invoice->sent = "yes";*/
        $invoice->save(); 
        }catch(\Exception $e){
            return response([
                "error" => $e->getMessage()
            ]);
        }
        return response([
            "message" => "Order is saved successfully."
        ]);
    }
    
    /*public function sendMail(Request $request){
        $order = new Order();
        $order->invoice_id = $request->invoice_id;
        $order->product_id = $request->product_id;
        $order->quantity = $request->quantity;
        //$order->total_price = 30000;
        try{
            $product = Product::findOrFail($order->product_id);
            $order->total_price = $product->price * $request->quantity;
            //$savedOrder = Order::with('product', 'invoice')->find($order->id);
            $invoice = Invoice::find($order->invoice_id);
            $response = $invoice->email;
            $orders = Order::with('product', 'invoice')->where('invoice_id', $invoice->id)->get(); //prepare obj collection to pass along with related data from other table
            Mail::to($invoice->email)->send(new SendMail($orders));
            $invoice->sent = "yes";
            $invoice->save();
        }catch(\Exception $e){
            return "Error: " . $e->getMessage();
        }
        return $response;
    }*/

    //solution functions
    public function sendMail(Request $request){
        $products = $request->items;
        try{
        $invoice=new Invoice();
        $invoice->client_id = $request->client_id;
        $invoice->issue_date = $request->date;
        $invoice->due_date = $request->due_date;
        $invoice->shipping_fee = $request->shipping_fee;
        $invoice->invoice_status = $request->invoice_status;
        $invoice->created_by = $request->created_by;
        $invoice->save();
        foreach($products as $product){
            $order = new Order();
            $order->invoice_id = $invoice->id;
            $order->product_id = $product['product_id'];
            $order->quantity = $product['quantity'];
            $soldProduct = Product::findOrFail($order->product_id);
            $order->total_price = $soldProduct->price * $order->quantity;
            $order->save();
        }
        //$invoice = Invoice::find($order->invoice_id); //invoice_id is only one anyway here
        //$response = $invoice->client_id;
        $client = Client::find($invoice->client_id);
        $response = $client->email;
        $orders = Order::with('product', 'invoice')->where('invoice_id', $invoice->id)->get(); //prepare obj collection to pass along with related data from other table
        Mail::to($client->email)->send(new SendMail($orders));
        $invoice->sent = "yes";
        $invoice->save(); 
        }catch(\Exception $e){
            return response([
                "error" => $e->getMessage()
            ]);
        }
        return response([
            "message" => "Order confirmation is sent to " . $response . " successfully."
        ]);
    }

    public function sendMultipleMails(Request $request){
        $i = 0;
        $response = [];
        $invoice_ids = $request->json()->all();
        try{
            foreach($invoice_ids as $invoice_id){
                $invoice = Invoice::findOrFail($invoice_id);
                $cli = Client::find($invoice['client_id']);
                $response[$i] = $cli->email;
                $orders = Order::with('product', 'invoice')->where('invoice_id', $invoice->id)->get(); //prepare obj collection to pass along with related data from other table
                Mail::to($cli->email)->send(new SendMail($orders));
                $invoice->sent = "yes";
                $invoice->save(); 
                $i++;
            }    
        }catch(\Exception $e){
            return response([
                "error" => $e->getMessage()
            ]);
        }
        $statement = "Order confirmations are sent to the selected clients successfully.\n";
        for($i = 0; $i < count($response); $i++){
            $statement .= "=>" . $response[$i] . "\n";
        }
        return response([
            "message"=> "". $statement . ""
        ]);
    }


    public function readAllOrders(Request $request){
        $orders = Order::all();
        return $orders;
    }

    //fetching orders with invoice id
    public function getOrdersByInvoiceId($invoice_id)
    {
        $orders = Order::where('invoice_id', $invoice_id)->get();
        return $orders;
    }

    //for real invoice and alert
    public function sendMultipleAlerts(Request $request){
        $i = 0;
        $response = [];
        $invoice_ids = $request->json()->all();
        try{
            foreach($invoice_ids as $invoice_id){
                $invoice = Invoice::findOrFail($invoice_id);
                $cli = Client::find($invoice['client_id']);
                $response[$i] = $cli->email;
                $orders = Order::with('product', 'invoice')->where('invoice_id', $invoice->id)->get(); //prepare obj collection to pass along with related data from other table
                Mail::to($cli->email)->send(new SendAlert($orders));
                $invoice->sent = "yes";
                $invoice->save(); 
                $i++;
            }    
        }catch(\Exception $e){
            return response([
                "error" => $e->getMessage()
            ]);
        }
        $statement = "Order confirmations are sent to the selected clients successfully.\n";
        for($i = 0; $i < count($response); $i++){
            $statement .= "=>" . $response[$i] . "\n";
        }
        return response([
            "message"=> "". $statement . ""
        ]);
    }

    public function sendMultipleRealInvoices(Request $request){
        $i = 0;
        $response = [];
        $invoice_ids = $request->json()->all();
        try{
            foreach($invoice_ids as $invoice_id){
                $invoice = Invoice::findOrFail($invoice_id);
                $cli = Client::find($invoice['client_id']);
                $response[$i] = $cli->email;
                $orders = Order::with('product', 'invoice')->where('invoice_id', $invoice->id)->get(); //prepare obj collection to pass along with related data from other table
                Mail::to($cli->email)->send(new SendInvoice($orders));
                $invoice->status = "paid";
                $invoice->invoice_status = "sent";
                $invoice->save(); 
                $i++;
            }    
        }catch(\Exception $e){
            return response([
                "error" => $e->getMessage()
            ]);
        }
        $statement = "Invoices are sent to the selected clients successfully.\n";
        for($i = 0; $i < count($response); $i++){
            $statement .= "=>" . $response[$i] . "\n";
        }
        return response([
            "message"=> "". $statement . ""
        ]);

        
    }
    

    
}
