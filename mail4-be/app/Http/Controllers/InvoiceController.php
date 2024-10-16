<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function addInvoice(Request $request){
        $invoice = new Invoice();
        $invoice->name = $request->name;
        $invoice->email = $request->email;
        if($invoice->save()){
            return response([
                "message" => "Invoice is added Successfully"
            ]);
        }
    }

    public function readAllInvoices(Request $request){
        $invoices = Invoice::all();
        return $invoices;
    }

    public function readAllSentInvoices(Request $request){
        $invoices = Invoice::where('sent', 'yes')->get();
        return $invoices;
    }

    public function readAllUnsentInvoices(Request $request){
        $invoices = Invoice::where('sent', 'no')->get();
        return $invoices;
    }

    public function getInvoiceById($invoice_id)
    {
        $invoice = Invoice::where('id', $invoice_id)->get();
        return $invoice;
    }

    public function deleteInvoices(Request $request)
    {
        $invoice_ids = $request->json()->all();
        // Check if any product IDs were provided
    if (!$invoice_ids) {
        return response()->json(['message' => 'No invoice is selected.'], 400);
    }

    // Find the products with the provided IDs
    $invoices = Invoice::whereIn('id', $invoice_ids)->get();

    // Loop through the products and delete each one
    foreach ($invoices as $invoice) {
        $invoice->delete();
    }
    return response([
        "message"=> "Successfully deleted the invoices."
    ]);
}
    public function readInvoiceCreators(){
        $creators = DB::select("SELECT created_by, COUNT(*) AS total_invoices
        FROM invoices
        GROUP BY created_by
        ORDER BY total_invoices DESC;");
        return $creators;
    }

    public function getInvoicesByDateRange(Request $request)
    {
        // Validate the request inputs
        $validated = $request->validate([
            'startDate' => 'required|date_format:Y-m-d',
            'endDate' => 'required|date_format:Y-m-d|after_or_equal:startDate',
        ]);

        // Retrieve invoices with due_date between startDate and endDate
        $invoices = Invoice::whereBetween('due_date', [$validated['startDate'], $validated['endDate']])->get();

        // Return the invoices in the response
        return $invoices;
    }
    
}
