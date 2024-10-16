<?php 
use Illuminate\Support\Facades\DB;
$grandTotal = 0;
$invoiceId = $orders->first()->invoice_id;
$client = DB::table('clients')
->join('invoices', 'clients.id', '=', 'invoices.client_id')
->join('orders', 'invoices.id', '=', 'orders.invoice_id')
->where('orders.invoice_id', $invoiceId)
->select('clients.*')
->first();
foreach ($orders as $order) {
    $grandTotal += $order->total_price;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .invoice-container {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
        }
        .invoice-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .invoice-details {
            margin-top: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }
        .invoice-total {
            background-color: #f5f5f5;
        }
    </style>
</head>
<body>
<div className="invoice-container">
            <div className='receipt'>
                <div className="invoice-header">
                    <h2>Invoice</h2>
                    <div className="invoice-info">                  
                        <p>Invoice Number: {{$invoiceId}}<br />
                        Date: {{date("D-M-Y")}}</p>
                    </div>
                </div>
                <div>
                    <p className='invoice-info'>billed to:</p>
                    <p>
                    {{ $client->name }}<br />
                    {{ $client->email }}<br />
                    {{ $client->address }}
                    </p>
                    <p className='invoice-info'>Due Date: {{date("D-M-Y")}}</p>
                </div>
                <div className="invoice-details">
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        @foreach($orders as $order)
                        
                    <tr>
                        <td>{{ $order->product->name }}</td>
                        <td>{{ $order->product->price }}</td>
                        <td>{{ $order->quantity }}</td>
                        <td>{{ $order->total_price }}</td>
                    </tr>
                @endforeach
                <tr>
    <td></td>
    <td></td>
    <td style="background-color: green; color: white;">Grand Total:</td>
    <td style="background-color: green; color: white;"><?php echo $grandTotal; ?></td>
</tr>
                        </tbody>
                    </table>
                </div></div>
                <a href="192.168.100.8:3000/wallet/100/1">Click Here to pay</a>

        </div>
    
</body>
</html>
