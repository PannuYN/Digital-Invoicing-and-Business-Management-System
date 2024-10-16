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
$invoice = DB::table('invoices')->where('id', $invoiceId)->first();
foreach ($orders as $order) {
    $grandTotal += $order->total_price;
$index = 1;
}
$realGrandTotal = $grandTotal + $invoice->shipping_fee;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css">
    <title>Order Confirmation</title>
    <style>
        .invoice-form {
    border: none;
    padding-bottom: 2vw; /* Adjust padding-top and padding-bottom */
    padding-left: 20px;
    padding-right: 20px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    max-width: 600px; /* Set maximum width */
    width: 90%; /* Set width to 90% of the viewport width */
  }
  
  
  /* Example of making text within the container smaller on smaller screens */
  @media screen and (max-width: 600px) {
    .invoice-form {
        font-size: 80%; /* Reduce font size to 80% of the default */
    }
  }
  
    .first-right, .second-left, .second-right {
      margin-bottom: 10px;
    }
    
    .first-right {   
      text-align: right;
    }
  
    .second-left {
      float: left;
      text-align: left;
    }
    
    .second-right {
      font-size: small;
      float: right;
      width: 200px;
    }
    
    .invoice-table {
      width: 100%;
      border-collapse: none;
      margin-top: 20px;
    }
    
    .invoice-table th, .invoice-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
    }
    
    .total-section {
      margin-top: 20px;
    }
    
    .total-section::after {
      content: "";
      display: table;
      clear: both;
    }
    
    .grand-total {
      float: right;
    }
    
    .invoice-info {
      display: flex;
      margin-bottom: 1px; /* Adjust the margin between each pair of label and value */
    }
    
    .label {
      flex: 1; /* Let the label grow to take available space */
      text-align: left; /* Align the label to the left */
      margin-right: auto; /* Adjust the margin between label and value */
    }
    
    .value {
      flex: 1; /* Let the value grow more to take more space */
      text-align: right; /* Align the value to the right */
    }
      
    </style>
</head>
<body>
<div>
    <div class="invoice-form flex-column">
        <div class='information'>
            <h1 style="font-weight: bold; margin-top: 20px;">Order Confirmation</h1>
            <div style="height: 20px;"></div>

            <div class="first-right">
                <div style="font-weight: bold;">Savannah. Clothing</div>
                <div style="font-size: small;">Yangon, Myanmar</div>
                <div style="font-size: small; font-style: underline;">09-837253889</div>
                <a href="#" style="font-size: small; font-style: underline;">savannahclothing.mm@hotmail.com</a>
            </div>

            <div class="second-left">
                <h5>Billed to:</h5>
                <div>{{$client->name}}</div>
                <div>{{$client->email}}</div>
                <div>{{$client->address}}</div>
            </div>

            <div class="second-right">
                <div style="height: 50px;"></div>
                <div class="invoice-info">
                    <span class="label">Quotation No:</span>
                    <span class="value">{{$invoiceId}}</span>
                </div>
                <div class="invoice-info">
                    <span class="label">Date:</span>
                    <span class="value">{{$invoice->issue_date}}</span>
                </div>
                <div class="invoice-info">
                    <span class="label">Due:</span>
                    <span class="value">{{$invoice->due_date}}</span>
                </div>
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th style="background-color: #a4dcd5;">No</th>
                    <th style="background-color: #a4dcd5;">Product</th>
                    <th style="background-color: #a4dcd5;">Price</th>
                    <th style="background-color: #a4dcd5;">Quantity</th>
                    <th style="background-color: #a4dcd5;">Amount</th>
                </tr>
            </thead>
            <tbody>
            @foreach($orders as $order)
                    <tr key={index}>
                        <td>{{ $index++ }}</td>
                        <td>{{ $order->product->name }}</td>
                        <td>{{ $order->product->price }}</td>
                        <td>{{ $order->quantity }}</td>
                        <td>{{ $order->total_price }}</td>
                    </tr>
                    @endforeach
                
                <tr >
                    <td colspan="3" style="border-bottom: none;"></td>
                    <td style="font-weight: bold; background-color: #a4dcd5;">Total</td>
                    <td style="background-color: #a4dcd5;"><?php echo $grandTotal; ?></td>
                </tr>
                <tr>
                    <td colspan="3" style="border-bottom: none;"></td>
                    <td style="font-weight: bold; background-color: #a4dcd5;">Shipping Fee</td>
                    <td style="background-color: #a4dcd5;">{{$invoice->shipping_fee}}</td>
                </tr>
            </tbody>
        </table>

        <div class="total-section">
            <hr class="divider" />
            <div class="grand-total" style="display: inline-block;">
                <h4 style="display: inline; font-weight: bold;">Grand Total:  </h4>
                <h5 style="display: inline;">{{$grandTotal + $invoice->shipping_fee}}</h5>
                <h5 style="display: inline;"> Ks</h5>
            </div>
        </div>
    </div>
    <a style="margin: auto" href="http://localhost:3000/wallet/{{$realGrandTotal}}/{{$invoiceId}}">Click Here to pay</a>

</div>

    
</body>
</html>
