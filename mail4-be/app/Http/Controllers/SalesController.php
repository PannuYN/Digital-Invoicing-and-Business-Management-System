<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller{
    public function overallSales(){
        $monthlySales = [];

    // Loop through each month
    for ($month = 1; $month <= 12; $month++) {
        // Calculate start and end date of the current month
        $startOfMonth = date('Y-m-01', strtotime(date("Y-{$month}-01")));
        $endOfMonth = date('Y-m-t', strtotime(date("Y-{$month}-01")));

        // Calculate total sales for the current month
        $totalSum = DB::table('orders')
            ->join('invoices', 'orders.invoice_id', '=', 'invoices.id')
            ->where('invoices.issue_date', '>=', $startOfMonth)
            ->where('invoices.issue_date', '<=', $endOfMonth)
            ->sum('orders.total_price');

        // Store the total sales for the current month in the array
        $monthlySales[$month] = $totalSum;
    }

    // Return the array containing total sales for each month
    return array_values($monthlySales);
        
}
}

